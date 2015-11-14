define(['jquery',
        "knockout",
        'model/polissen',
        'commons/block',
        'commons/3rdparty/log',
        'commons/commonFunctions',
        'dataServices'],
     function($, ko, Polissen, block, log, commonFunctions, dataServices) {

	return function(relatieId) {
		log.debug("Ophalen polissen bij Relatie met id " + relatieId);
		block.block();

		dataServices.lijstPolissen(relatieId).done(function(data){
			log.debug("opgehaald : " + JSON.stringify(data));

			dataServices.lijstVerzekeringsmaatschappijen().done(function(maatschappijen){
                $.each(data, function(key, value) {
                    if(value.maatschappij != null) {
                        $.each(maatschappijen, function(keyM, valueM) {
                            if(keyM == value.maatschappij){
                                value.maatschappij = valueM;
                            }
                        });
                    }
                });
                ko.validation.registerExtenders();

                ko.applyBindings(new Polissen(data));
                $.unblockUI();
			});

		}).fail(function(data){
			commonFunctions.nietMeerIngelogd(data);
		});
	};
});