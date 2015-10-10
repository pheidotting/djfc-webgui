define(['jquery',
        "knockout",
        'model/schades',
        'commons/block',
        'commons/3rdparty/log',
        'commons/commonFunctions',
        'dataservices'],
     function($, ko, Schades, block, log, commonFunctions, dataservices) {

	return function(relatieId) {
		log.debug("Ophalen schades bij Relatie met id " + relatieId);
		block.block();

		dataservices.lijstSchades(relatieId).done(function(data){
            log.debug("opgehaald : " + JSON.stringify(data));
            ko.validation.registerExtenders();

            ko.applyBindings(new Schades(data));
		}).fail(function(data){
            commonFunctions.nietMeerIngelogd(data);
		});
	};
});