define(["commons/3rdparty/log",
        "navRegister",
        'knockout',
        'repository/common/repository',
        'repository/bedrijf-repository',
        'service/common/adres-service',
        'service/common/telefoonnummer-service',
        'service/common/rekeningnummer-service',
        'service/common/opmerking-service',
        'service/common/bijlage-service'],
    function(log, navRegister, ko, repository, bedrijfRepository, adresService, telefoonnummerService, rekeningnummerService, opmerkingService, bijlageService) {

        return {
            opslaan: function(bedrijf, adressen, telefoonnummers, opmerkingen, contactpersonen) {
                var deferred = $.Deferred();

                $.when(repository.leesTrackAndTraceId()).then(function(trackAndTraceId) {
                    $.when(bedrijfRepository.opslaan(bedrijf, trackAndTraceId)).then(function(response) {
                        var id = response.entity;
                        var soortEntiteit = 'BEDRIJF';

                        $.when(adresService.opslaan(adressen, trackAndTraceId, soortEntiteit, id),
                            telefoonnummerService.opslaan(telefoonnummers, trackAndTraceId, soortEntiteit, id),
                            opmerkingService.opslaan(opmerkingen, trackAndTraceId, soortEntiteit, id))
                        .then(function(adresResponse, telefoonnummerResponse, rekeningnummerResponse, opmerkingResponse) {

                            if(contactpersonen().length > 0) {
                                $.each(contactpersonen(), function(i, contactpersoon){
                                    contactpersoon.bedrijf(id);
                                    var telefoonnummers = contactpersoon.telefoonnummers;
                                    contactpersoon.telefoonnummers = null;
                                    repository.voerUitPost(navRegister.bepaalUrl('OPSLAAN_CONTACTPERSOON'), ko.toJSON(contactpersoon), trackAndTraceId).done(function(cpId){
                                        telefoonnummerService.opslaan(telefoonnummers, trackAndTraceId, 'CONTACTPERSOON', cpId)
                                    });
                                });
                            }

                            return deferred.resolve(id);
                        });
                    });
                });

                return deferred.promise();
            },

            verwijderRelatie: function(id) {
                return this.voerUitGet(navRegister.bepaalUrl('VERWIJDER_RELATIE'), {id : id});
            },

            leesBedrijf: function(id) {
                var deferred = $.Deferred();
                var bedrijf;
                var bedrijfsId = id;

                $.when(
                    bedrijfRepository.leesBedrijf(id),
                    bijlageService.lijst('BEDRIJF', id),
                    bijlageService.lijstGroep('BEDRIJF', id),
                    opmerkingService.lijst('BEDRIJF', id),
                    adresService.lijst('BEDRIJF', id),
                    telefoonnummerService.lijst('BEDRIJF', id)
                ).then(function(bedrijf, bijlages, groepBijlages, opmerkingen, adressen, telefoonnummers) {
                                    bedrijf.bijlages = bijlages;
                                    bedrijf.groepBijlages = groepBijlages;
                                    bedrijf.opmerkingen = opmerkingen;
                                    bedrijf.adressen = adressen;
                                    bedrijf.telefoonnummers = telefoonnummers;
                                    bedrijf.contactpersonen = [];

                    if(id == 0) {
                        return deferred.resolve(bedrijf);
                    } else {
                        $.when(repository.voerUitGet(navRegister.bepaalUrl('LIJST_CONTACTPERSONEN'), {"bedrijfsId" : bedrijfsId})).then(function(contactpersonen) {
                            var aantalOphalen = contactpersonen.length;

                            if(aantalOphalen === 0) {
                                teruggeven();
                            }

                            $.each(contactpersonen, function(index, contactpersoon) {
                                repository.voerUitGet(navRegister.bepaalUrl('LIJST_TELEFOONNUMMERS') + '/CONTACTPERSOON/' + contactpersoon.id).done(function(telefoonnummers) {
                                    contactpersoon.telefoonnummers = telefoonnummers;
                                    bedrijf.contactpersonen.push(contactpersoon);
                                    if(--aantalOphalen === 0) {
                                        teruggeven();
                                    }
                                });
                            });

                            function teruggeven() {
                                return deferred.resolve(bedrijf);
                            }
                        });
                    }
                });

                return deferred.promise();
            },

            lijstBedrijven: function(zoekTerm) {
                var deferred = $.Deferred();
                var aantal = 0;
                var dataRelaties;

                bedrijfRepository.lijstBedrijven(zoekTerm).done(function(data) {
                    aantal = data.length;
                    dataBedrijven = data;

                    var ids = _.map(dataBedrijven, function(bedrijf){
                        return bedrijf.id;
                    });

                    $.when(repository.voerUitGet(navRegister.bepaalUrl('ALLE_ADRESSEN_BIJ_ENTITEIT') + '?soortEntiteit=BEDRIJF&lijst=' + ids.join('&lijst='))).then(function(lijstAdressen){
                        $.each(dataBedrijven, function(i, item) {
                            item.adressen = _.filter(lijstAdressen, function(adres){
                                return adres.entiteitId == item.id;
                            });
                        });

                        return deferred.resolve(dataBedrijven);
                    });
                });

                function teruggeven(aantalOphalen) {
                    if(aantalOphalen === 0) {
                        return deferred.resolve(dataBedrijven);
                    }
                }

                return deferred.promise();
                }
            }
        }
);