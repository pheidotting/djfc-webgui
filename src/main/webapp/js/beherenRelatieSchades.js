define(['jquery',
        "knockout",
        'model/schades',
        'commons/block',
        'commons/3rdparty/log',
        'commons/commonFunctions',
        'dataServices'],
    function($, ko, Schades, block, log, commonFunctions, dataServices) {

    return function(relatieId) {
		log.debug("Ophalen schades bij Relatie met id " + relatieId);
		block.block();

		dataServices.lijstSchades(relatieId).done(function(data){
            log.debug("opgehaald : " + JSON.stringify(data));
            ko.validation.registerExtenders();

            ko.applyBindings(new Schades(data, relatieId));
		}).fail(function(data){
            commonFunctions.nietMeerIngelogd(data);
		});
	};
});