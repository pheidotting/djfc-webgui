define(['jquery',
        "knockout",
        'model/aangifte',
        'model/aangiftes',
        'commons/block',
        'commons/3rdparty/log',
        'dataservices'],
    function($, ko, Aangifte, Aangiftes, block, log, dataservices) {

	return function(relatieId) {
		block.block();
		log.debug("Ophalen openstaande aangiftes voor Relatie met id : " + relatieId);

		dataservices.lijstGeslotenAangiftes(relatieId).done(function(data) {
			ko.applyBindings(new Aangiftes(data));
	    });
	};
});