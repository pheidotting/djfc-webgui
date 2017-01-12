define(["commons/3rdparty/log2",
        "navRegister",
        'knockout',
        'repository/common/repository',
        'repository/gebruiker-repository',
        'service/common/adres-service',
        'service/common/telefoonnummer-service',
        'service/common/rekeningnummer-service',
        'service/common/opmerking-service',
        'service/common/bijlage-service'],
    function(log, navRegister, ko, repository, gebruikerRepository, adresService, telefoonnummerService, rekeningnummerService, opmerkingService, bijlageService) {
        var logger = log.getLogger('gebruiker-service');

        return {
            opslaan: function(relatie, adressen, telefoonnummers, rekeningnummers, opmerkingen) {
                var deferred = $.Deferred();

                $.when(repository.leesTrackAndTraceId()).then(function(trackAndTraceId) {
                    $.when(gebruikerRepository.opslaan(relatie, trackAndTraceId)).then(function(response) {
                        var id = response.entity.foutmelding;
                        var soortEntiteit = 'RELATIE';

                        $.when(adresService.opslaan(adressen, trackAndTraceId, soortEntiteit, id),
                            telefoonnummerService.opslaan(telefoonnummers, trackAndTraceId, soortEntiteit, id),
                            rekeningnummerService.opslaan(rekeningnummers, trackAndTraceId, soortEntiteit, id),
                            opmerkingService.opslaan(opmerkingen, trackAndTraceId, soortEntiteit, id))
                        .then(function(adresResponse, telefoonnummerResponse, rekeningnummerResponse, opmerkingResponse) {
                            return deferred.resolve(id);
                        });
                    });
                });

                return deferred.promise();
            },

            leesRelatie: function(id) {
                logger.debug('ophalen relatie met id ' + id);

                var deferred = $.Deferred();

                $.when(gebruikerRepository.leesRelatie(id),
                        bijlageService.lijst('RELATIE', id),
                        bijlageService.lijstGroep('RELATIE', id),
                        opmerkingService.lijst('RELATIE', id),
                        adresService.lijst('RELATIE', id),
                        telefoonnummerService.lijst('RELATIE', id),
                        rekeningnummerService.lijst('RELATIE', id)
                        ).then(function(relatie, bijlages, groepBijlages, opmerkingen, adressen, telefoonnummers, rekeningnummers ) {

                            relatie.bijlages = bijlages;
                            relatie.groepBijlages = groepBijlages;
                            relatie.opmerkingen = opmerkingen;
                            relatie.adressen = adressen;
                            relatie.telefoonnummers = telefoonnummers;
                            relatie.rekeningnummers = rekeningnummers;

                            return deferred.resolve(relatie);
                });

                return deferred.promise();
            },

            lijstRelaties: function(zoekTerm, weglaten) {
                logger.debug('ophalen lijst relaties met zoekTerm '+ zoekTerm);
                var deferred = $.Deferred();
                var aantal = 0;
                var relatieRelaties;

                gebruikerRepository.lijstRelaties(zoekTerm, weglaten).done(function(relatie) {
                    aantal = relatie.jsonRelaties.length;
                    relatieRelaties = relatie;
                    $.each(relatie.jsonRelaties, function(i, item) {
                        adresService.lijst('RELATIE', item.id).done(function(adressen) {
                            item.adressen = adressen;
                            teruggeven(--aantal);
                        });
                    });
                });

                function teruggeven(aantalOphalen) {
                    if(aantalOphalen === 0) {
                        return deferred.resolve(relatieRelaties);
                    }
                }

                return deferred.promise();
            },

            verwijderRelatie: function(id) {
                var deferred = $.Deferred();

                $.when(repository.leesTrackAndTraceId()).then(function(trackAndTraceId) {
                    gebruikerRepository.verwijderRelatie(id, trackAndTraceId);
                    bijlageService.opslaan(ko.observableArray([]), trackAndTraceId, 'RELATIE', id);
                    opmerkingService.opslaan(ko.observableArray([]), trackAndTraceId, 'RELATIE', id);
                    adresService.opslaan(ko.observableArray([]), trackAndTraceId, 'RELATIE', id);
                    telefoonnummerService.opslaan(ko.observableArray([]), trackAndTraceId, 'RELATIE', id);
                    rekeningnummerService.opslaan(ko.observableArray([]), trackAndTraceId, 'RELATIE', id);

                    return deferred.resolve();
                });

                return deferred.promise();
            },

            opslaanOAuthCode: function(code) {
                $.when(repository.leesTrackAndTraceId()).then(function(trackAndTraceId) {
                    gebruikerRepository.opslaanOAuthCode(code, trackAndTraceId);
                });
            },

            leesOAuthCode: function() {
                return gebruikerRepository.leesOAuthCode();
            }
        }
    }
);