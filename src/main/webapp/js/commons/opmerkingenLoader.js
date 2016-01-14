define(["commons/3rdparty/log"],
    function(log) {

        return function(id){
            var _thisOpmerkingen = this;

            _thisOpmerkingen.init = function(){
                log.debug("Instantieren opmerkingen");

                var deferred = $.Deferred();

                if(id !== 0){
                    $('#opmerkingen').load('templates/commons/opmerkingen.html', function() {
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