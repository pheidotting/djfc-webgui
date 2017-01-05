define(["commons/3rdparty/log",
        "navRegister",
        'knockout',
        'repository/common/repository'],
    function(log, navRegister, ko, abstractRepository) {

        return {
            isFeatureBeschikbaar: function(toggle) {
                var togglePromise = $.Deferred();

                abstractRepository.voerUitGet(navRegister.bepaalUrl('TOGGLZ') + "/" + toggle).done(function(toggles) {
                    return togglePromise.resolve(toggles);
                }).fail(function(){
                    return togglePromise.resolve(false);
                });

                return togglePromise.promise();
            }
        }
    }
);