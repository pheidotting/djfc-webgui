define(['commons/3rdparty/log2',
        'navRegister',
        'knockout',
        'repository/common/repository'],
    function(log, navRegister, ko, repository) {
        var logger = log.getLogger('wachtwoord-service');

        return {
            verstuur: function(gebruikersnaamEnWachtwoord, inloggen) {
                logger.debug('Versturen wachtwoord');
                var deferred = $.Deferred();

                $.when(repository.leesTrackAndTraceId()).then(function(trackAndTraceId) {
                    var url = navRegister.bepaalUrl('INLOGGEN');
                    if(!inloggen) {
                        url = navRegister.bepaalUrl('WIJZIG_WACHTWOORD');
                    }

                    var request = {
                        identificatie: gebruikersnaamEnWachtwoord.identificatie,
                        wachtwoord: encryptWachtwoord(gebruikersnaamEnWachtwoord.wachtwoord)
                    }

                });

                return deferred.promise();
            }
        }

        function encryptWachtwoord(wachtwoord) {
            logger.debug('encrypt');

            return wachtwoord;
        }
    }
);