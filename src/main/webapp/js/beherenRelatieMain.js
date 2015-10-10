define(['jquery',
        "knockout",
        'model/relatie',
        'commons/block',
        'commons/3rdparty/log',
        'commons/commonFunctions',
        'jqueryUI',
        'dataservices'],
     function($, ko, Relatie, block, log, commonFunctions, jqueryUI, dataservices) {

	return function(relatieId) {
		block.block();
		log.debug("ophalen Relatie met id " + relatieId);

		dataservices.leesRelatie(relatieId).done(function(data){
			log.debug("opgehaald : " + JSON.stringify(data));
			ko.validation.registerExtenders();

			var relatie = new Relatie(data);

			ko.applyBindings(relatie);

			if(relatie.opmerkingen().length > 0){
				$("#opmerkingenDialog").dialog();
			}
			$("#persoonsGegevensDialog").dialog();
		}).fail(function(data){
			commonFunctions.nietMeerIngelogd(data);
		});
	};
});