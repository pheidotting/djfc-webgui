define(["commons/3rdparty/log"],
    function(log) {

        return function opmerkingenModel(id, opmerkingen){
            _thisOpmerkingen = this;

            _thisOpmerkingen.init = function(){
                log.debug("Instantieren adressen");

                var deferred = $.Deferred();

                if(id != 0){
                    $('#adressen').load('templates/commons/adressen.html', function(response, status, xhr) {
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