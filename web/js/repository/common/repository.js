define(["commons/3rdparty/log2",
        "navRegister",
        'knockout',
        'redirect'],
    function(log, navRegister, ko, redirect) {
        var logger = log.getLogger('repository');

        return {
            voerUitGet: function(url, data){
                var deferred = $.Deferred();

                if(data == null) {
                    logger.trace('uitvoeren get op url \'' + url + '\'');
                } else {
                    logger.trace('uitvoeren get op url \'' + url + '\' met data \'' + JSON.stringify(data) + '\'');
                }
                $.get(url, data)
                .done(function(response) {
                    return deferred.resolve(response);
                });
//                .fail(function(response){
//                    if (response.status === 401) {
//                        redirect.redirect('INLOGGEN');
//                    }
//                    return deferred.reject();
//                });

                return deferred.promise();
            },

            voerUitPost: function(url, data, trackAndTraceId){
                var deferred = $.Deferred();

                $.ajax({
                    type: "POST",
                    url: url,
                    contentType: "application/json",
                    data: data,
                    ataType: "json",
                    async: false,
                    beforeSend: function(xhr){xhr.setRequestHeader('trackAndTraceId', trackAndTraceId);},
                    success: function (response) {
                        return deferred.resolve(response);
                    },
                    error: function (response) {
                        return deferred.resolve(response);
                    }
                });

                return deferred.promise();
            },

            leesTrackAndTraceId: function() {
                return this.voerUitGet(navRegister.bepaalUrl('TRACKANDTRACEID'))
            }
        }
    }
);