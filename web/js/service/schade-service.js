define(["commons/3rdparty/log",
        "navRegister",
        'knockout',
        'repository/common/repository',
        'repository/schade-repository',
        'repository/gebruiker-repository',
        'service/common/opmerking-service',
        'service/common/bijlage-service',
        'underscore'],
    function(log, navRegister, ko, repository, schadeRepository, gebruikerRepository, opmerkingService, bijlageService, _) {

        return {
            opslaan: function(schade, opmerkingen) {
                var deferred = $.Deferred();

                $.when(repository.leesTrackAndTraceId()).then(function(trackAndTraceId) {
                    schade.opmerkingen = opmerkingen;

                    $.when(schadeRepository.opslaan(schade, trackAndTraceId)).then(function(response) {
//                        var id = response.entity.foutmelding;
//                        var soortEntiteit = 'SCHADE';
//
//                        $.when(opmerkingService.opslaan(opmerkingen, trackAndTraceId, soortEntiteit, id))
//                        .then(function(opmerkingResponse) {
                            return deferred.resolve();
//                        });
                    });
                });

                return deferred.promise();
            },

            lees: function(id) {
                var identificatie = id;
                var deferred = $.Deferred();

                $.when(gebruikerRepository.leesRelatie(identificatie)).then(function(data) {
                    return deferred.resolve(data);
                });

                return deferred.promise();
            },

            lijstStatusSchade: function() {
                return schadeRepository.lijstStatusSchade();
            },

            lijstSchades: function(relatieId) {
                var deferred = $.Deferred();

                $.when(gebruikerRepository.leesRelatie(relatieId)).then(function(data) {
                    var schades = _.chain(data.polissen)
                    .map('schades')
                    .flatten()
                    .value();

                    return deferred.resolve(schades);
                });

                return deferred.promise();
            },

            verwijderSchade: function(id) {
                return schadeRepository.verwijderSchade(id);
            }
        }
    }
);