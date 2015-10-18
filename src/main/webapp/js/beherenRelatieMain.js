define(['jquery',
        "knockout",
        'model/relatie',
        'commons/block',
        'commons/3rdparty/log',
        'commons/commonFunctions',
        'jqueryUI',
        'dataServices',
        'fileUpload'],
     function($, ko, Relatie, block, log, commonFunctions, jqueryUI, dataServices, fileUpload) {

	return function(relatieId) {
		block.block();
		log.debug("ophalen Relatie met id " + relatieId);

		dataServices.leesRelatie(relatieId).done(function(data){
			log.debug("opgehaald : " + JSON.stringify(data));
			ko.validation.registerExtenders();

			var relatie = new Relatie(data);

            fileUpload.init().done(function(){
			    ko.applyBindings(relatie);
            });

//			if(relatie.opmerkingen().length > 0){
//				$("#opmerkingenDialog").dialog();
//			}
//			$("#persoonsGegevensDialog").dialog();
		}).fail(function(data){
			commonFunctions.nietMeerIngelogd(data);
		});
	};
});