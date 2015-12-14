define(["commons/3rdparty/log"],
    function(log) {

        return function telefoonnummersModel(id){
            _thisTelefonnummers = this;

            _thisTelefonnummers.init = function(){
                log.debug("Instantieren telefoonnummers");

                var deferred = $.Deferred();

                if(id != 0){
                    $('#telefoonnummers').load('templates/commons/telefoonnummers.html', function(response, status, xhr) {
                        return deferred.resolve();
                    });
                } else {
                    return deferred.resolve();
                }

                return deferred.promise();
            };
        }
    }
);