define(["commons/3rdparty/log",
        "navRegister",
        'knockout',
        'repository/common/repository'],
    function(log, navRegister, ko, abstractRepository) {

        return {
            haalOp: function(telefoonnummers) {
                var params = '';

                _.each(telefoonnummers, function(telefoonnummer){
                    if (params == '') {
                        params = '?telefoonnummer=' + telefoonnummer.telefoonnummer;
                    } else {
                        params = params + '&telefoonnummer=' + telefoonnummer.telefoonnummer;
                    }
                });

                return abstractRepository.voerUitGet(navRegister.bepaalUrl('TELEFONIE_RECORDINGS') + params);
            }
        }
    }
);