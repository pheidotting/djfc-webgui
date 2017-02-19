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

            leesMedewerker: function(id) {
                logger.debug('ophalen medewerker met id ' + id);

                var deferred = $.Deferred();

                $.when(gebruikerRepository.leesMedewerker(id)).then(function(medewerker) {
                    return deferred.resolve(medewerker);
                });

                return deferred.promise();
            },

            lijstRelaties: function(zoekTerm, weglaten) {
                logger.debug('ophalen lijst relaties met zoekTerm '+ zoekTerm);
                var deferred = $.Deferred();
                var relatieRelaties;

                gebruikerRepository.lijstRelaties(zoekTerm, weglaten).done(function(relatie) {
                    relatieRelaties = relatie;

                    var ids = _.map(relatie.jsonRelaties, function(relatie){
                        return relatie.id;
                    });

                    $.when(repository.voerUitGet(navRegister.bepaalUrl('ALLE_ADRESSEN_BIJ_ENTITEIT') + '?soortEntiteit=RELATIE&lijst=' + ids.join('&lijst='))).then(function(lijstAdressen){
                        $.each(relatie.jsonRelaties, function(i, item) {
                            item.adressen = _.filter(lijstAdressen, function(adres){
                                return adres.entiteitId == item.id;
                            });
                        });

                        return deferred.resolve(relatieRelaties);
                    });
                });

                return deferred.promise();
            },

            verwijderRelatie: function(id) {
                var deferred = $.Deferred();

                $.when(repository.leesTrackAndTraceId()).then(function(trackAndTraceId) {
                    gebruikerRepository.verwijderRelatie(id, trackAndTraceId);

                    return deferred.resolve();
                });

                return deferred.promise();
            },

            opslaanOAuthCode: function(code) {
                var deferred = $.Deferred();

                $.when(repository.leesTrackAndTraceId()).then(function(trackAndTraceId) {
                    $.when(gebruikerRepository.opslaanOAuthCode(code, trackAndTraceId)).then(function(){
                        return deferred.resolve();
                    });
                });

                return deferred.promise();
            },

            inloggen: function(data){
                var deferred = $.Deferred();

                $.when(repository.voerUitPost(navRegister.bepaalUrl('INLOGGEN'), ko.toJSON(data), '')).always(function(result){
                    return deferred.resolve(result);
                });

                return deferred.promise();
            },

            leesOAuthCode: function() {
                return gebruikerRepository.leesOAuthCode();
            }
        }
    }
);