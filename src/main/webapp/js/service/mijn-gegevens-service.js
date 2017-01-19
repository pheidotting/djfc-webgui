define(["commons/3rdparty/log",
        "navRegister",
        'knockout',
        'repository/common/repository',
        'repository/polis-repository',],
    function(log, navRegister, ko, repository) {
        var logger = log.getLogger('mijn-gegevens-service');

        return {
            opslaan: function(polis, opmerkingen){
                var deferred = $.Deferred();


                return deferred.promise();
            }
        }
    }
);