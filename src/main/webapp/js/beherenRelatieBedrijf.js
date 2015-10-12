define(['jquery',
        "knockout",
        'model/bedrijf',
        'commons/block',
        'commons/3rdparty/log',
        'dataServices'],
    function($, ko, Bedrijf, block, log, dataServices) {

	return function(bedrijfId, relatieId) {
		block.block();
		log.debug("Ophalen Bedrijf met id : " + bedrijfId);

		dataServices.leesBedrijf(subId).done(function(data){
			var bedrijf = new Bedrijf(data);
			bedrijf.relatie(relatieId);
			ko.applyBindings(bedrijf);
	    });
	};
});