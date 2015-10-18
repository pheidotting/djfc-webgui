define(["commons/3rdparty/log",
        'commons/commonFunctions',
        'model/bijlage',
        'navRegister'],
    function(log, commonFunctions, Bijlage, navRegister) {

        return {
            init: function(){
                log.debug("Instantieren file upload");

                var deferred = $.Deferred();

                $('#fileUpload').load('templates/commons/fileUpload.html', function(response, status, xhr) {
                    return deferred.resolve();
                });

                return deferred.promise();
            },

            uploaden: function(){
                var deferred = $.Deferred();

                var formData = new FormData($('#fileUploadForm')[0]);
                commonFunctions.uploadBestand(formData, navRegister.bepaalUrl('UPLOAD_BIJLAGE')).done(function(response) {
                    log.debug(JSON.stringify(response));

                    var bijlageData = {};
                    bijlageData.id = response.id;
                    bijlageData.soortBijlage = response.soortBijlage;
                    bijlageData.bestandsNaam = response.bestandsNaam;
                    bijlageData.datumUpload = response.datumUpload;

                    $('#bijlageFile').val("");

                    return deferred.resolve(new Bijlage(bijlageData));
                });

                return deferred.promise();
            }
        }
    }
);