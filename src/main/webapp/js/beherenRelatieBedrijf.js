define(['jquery',
        "knockout",
        'model/bedrijf',
        'commons/block',
        'commons/3rdparty/log',
        'dataservices'],
    function($, ko, Bedrijf, block, log, dataservices) {

	return function(bedrijfId, relatieId) {
		block.block();
		log.debug("Ophalen Bedrijf met id : " + bedrijfId);

		dataservices.leesBedrijf(subId).done(function(data){
			var bedrijf = new Bedrijf(data);
			bedrijf.relatie(relatieId);
			ko.applyBindings(bedrijf);
	    });
	};
});