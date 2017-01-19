define(["commons/3rdparty/log",
        "navRegister",
        'knockout',
        'repository/common/repository',
        'repository/schade-repository',
        'service/common/opmerking-service',
        'service/common/bijlage-service'],
    function(log, navRegister, ko, repository, schadeRepository, opmerkingService, bijlageService) {

        return {
            opslaan: function(schade, opmerkingen) {
                var deferred = $.Deferred();

                $.when(repository.leesTrackAndTraceId()).then(function(trackAndTraceId) {
                    $.when(schadeRepository.opslaan(schade, trackAndTraceId)).then(function(response) {
                        var id = response.entity.foutmelding;
                        var soortEntiteit = 'SCHADE';

                        $.when(opmerkingService.opslaan(opmerkingen, trackAndTraceId, soortEntiteit, id))
                        .then(function(opmerkingResponse) {
                            return deferred.resolve(id);
                        });
                    });
                });

                return deferred.promise();
            },

            lees: function(id) {
                var deferred = $.Deferred();

                $.when(
                    schadeRepository.lees(id),
                    bijlageService.lijst('SCHADE', id),
                    opmerkingService.lijst('SCHADE', id),
                    bijlageService.lijstGroep('SCHADE', id)
                )
                .then(function(data, bijlages, opmerkingen, groepenBijlages) {
                    data.bijlages = bijlages;
                    data.opmerkingen = opmerkingen;
                    data.groepenBijlages = groepenBijlages;

                    return deferred.resolve(data);
                });

                return deferred.promise();
            },

            lijstStatusSchade: function() {
                return schadeRepository.lijstStatusSchade();
            },

            lijstSchades: function(relatieId, soortEntiteit) {
                return schadeRepository.lijstSchades(relatieId, soortEntiteit);
            },

            verwijderSchade: function(id) {
                return schadeRepository.verwijderSchade(id);
            }
        }
    }
);