define(['jquery',
        "knockout",
        'model/polissen',
        'commons/block',
        'commons/3rdparty/log',
        'commons/commonFunctions',
        'dataservices'],
     function($, ko, Polissen, block, log, commonFunctions, dataservices) {

	return function(relatieId) {
		log.debug("Ophalen polissen bij Relatie met id " + relatieId);
		block.block();

		dataservices.lijstPolissen(relatieId).done(function(data){
			log.debug("opgehaald : " + JSON.stringify(data));
			ko.validation.registerExtenders();

			ko.applyBindings(new Polissen(data));
		}).fail(function(data){
			commonFunctions.nietMeerIngelogd(data);
		});
	};
});