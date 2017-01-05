define(["commons/3rdparty/log",
        "navRegister",
        'knockout',
        'repository/common/repository',
        'repository/polis-repository',
        'service/common/opmerking-service',
        'service/common/bijlage-service'],
    function(log, navRegister, ko, repository, polisRepository, opmerkingService, bijlageService) {

        return {
            opslaan: function(polis, opmerkingen){
                var deferred = $.Deferred();

                polis.maatschappij = ko.observable(polis.maatschappij.id);

                $.when(repository.leesTrackAndTraceId()).then(function(trackAndTraceId){
                    $.when(polisRepository.opslaan(polis, trackAndTraceId)).then(function(id){
                        var soortEntiteit = 'POLIS';

                        $.when(opmerkingService.opslaan(opmerkingen, trackAndTraceId, soortEntiteit, id))
                        .then(function(opmerkingResponse){
                            return deferred.resolve(id);
                        });
                    });
                });

                return deferred.promise();
            },

            verwijder: function(id){
                return repository.voerUitGet(navRegister.bepaalUrl('VERWIJDER_POLIS'), {id : id});
            },

            lees: function(id){
                var deferred = $.Deferred();
                var _this = this;

                $.when(polisRepository.lees(id),
                    bijlageService.lijst('POLIS', id),
                    opmerkingService.lijst('POLIS', id),
                    bijlageService.lijstGroep('POLIS', id))
                    .then(function(data, bijlages, opmerkingen, groepenBijlages) {
                        data.bijlages = bijlages;
                        data.opmerkingen = opmerkingen;
                        data.groepenBijlages = groepenBijlages;

                        return deferred.resolve(data);
                });

                return deferred.promise();
            },

            lijstVerzekeringsmaatschappijen: function(){
                return polisRepository.lijstVerzekeringsmaatschappijen();
            },

            lijstParticulierePolissen: function(){
                return polisRepository.lijstParticulierePolissen();
            },

            lijstZakelijkePolissen: function(){
                return polisRepository.lijstZakelijkePolissen();
            },

            lijstPolissen: function(relatieId){
                return polisRepository.lijstPolissen(relatieId);
            },

            beindigPolis: function(id){
                $.when(repository.leesTrackAndTraceId()).then(function(trackAndTraceId){
                    polisRepository.beindigPolis(id, trackAndTraceId);
                });
            },

            verwijderPolis: function(id){
                $.when(repository.leesTrackAndTraceId()).then(function(trackAndTraceId){
                    polisRepository.verwijderPolis(id, trackAndTraceId);
                });
            }
        }
    }
);