define(["commons/3rdparty/log2",
        "navRegister",
        'knockout',
        'repository/common/repository'],
    function(log, navRegister, ko, abstractRepository) {

        var logger = log.getLogger('toggle-service');

        return {
            isFeatureBeschikbaar: function(toggle) {
                var togglePromise = $.Deferred();

                abstractRepository.voerUitGet(navRegister.bepaalUrl('TOGGLZ') + "/" + toggle).done(function(toggles) {
                    logger.trace(toggles);
                    return togglePromise.resolve(toggles);
                }).fail(function(){
                    logger.trace(false);
                    return togglePromise.resolve(false);
                });

                return togglePromise.promise();
            }
        }
    }
);