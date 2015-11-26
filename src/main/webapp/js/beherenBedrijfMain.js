define(['jquery',
        "knockout",
        'model/bedrijf',
        'commons/block',
        'commons/3rdparty/log',
        'commons/commonFunctions',
        'jqueryUI',
        'dataServices',
        'fileUpload',
        'opmerkingenLoader'],
    function($, ko, Bedrijf, block, log, commonFunctions, jqueryUI, dataServices, fileUpload, opmerkingenLoader) {

	return function(bedrijfId) {
		block.block();
		log.debug("ophalen Relatie met id " + bedrijfId);

		dataServices.leesBedrijf(bedrijfId).done(function(data){
			log.debug("opgehaald : " + JSON.stringify(data));
			ko.validation.registerExtenders();

			var bedrijf = new Bedrijf(data);

            new fileUpload.init().done(function(){
                new opmerkingenLoader(bedrijfId).init().done(function(){
                    log.debug("Do the knockout magic");
                    log.debug(JSON.stringify(bedrijf));
                    ko.applyBindings(bedrijf);
                });
            });
		}).fail(function(data){
			commonFunctions.nietMeerIngelogd(data);
		});
	};
});