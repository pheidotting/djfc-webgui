define(['jquery',
        "knockout",
        'model/bedrijven',
        'commons/block',
        'commons/3rdparty/log',
        'commons/commonFunctions',
        'dataservices'],
     function($, ko, Bedrijven, block, log, commonFunctions, dataservices) {

	return function(relatieId) {
		log.debug("Ophalen bedrijven bij Relatie met id " + relatieId);
		block.block();

		dataservices.lijstBedrijven(relatieId).done(function(data){
			log.debug("opgehaald : " + JSON.stringify(data));
			ko.validation.registerExtenders();

			ko.applyBindings(new Bedrijven(data));
		}).fail(function(data){
			commonFunctions.nietMeerIngelogd(data);
		});
	};
});