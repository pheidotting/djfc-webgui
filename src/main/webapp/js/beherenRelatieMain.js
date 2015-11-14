define(['jquery',
        "knockout",
        'model/relatie',
        'commons/block',
        'commons/3rdparty/log',
        'commons/commonFunctions',
        'jqueryUI',
        'dataServices',
        'fileUpload',
        'opmerkingenLoader'],
    function($, ko, Relatie, block, log, commonFunctions, jqueryUI, dataServices, fileUpload, opmerkingenLoader) {

	return function(relatieId) {
		block.block();
		log.debug("ophalen Relatie met id " + relatieId);

		dataServices.leesRelatie(relatieId).done(function(data){
			log.debug("opgehaald : " + JSON.stringify(data));
			ko.validation.registerExtenders();

			var relatie = new Relatie(data);

            new fileUpload.init().done(function(){
                new opmerkingenLoader(relatieId).init().done(function(){
                    ko.applyBindings(relatie);
                });
            });
		}).fail(function(data){
			commonFunctions.nietMeerIngelogd(data);
		});
	};
});