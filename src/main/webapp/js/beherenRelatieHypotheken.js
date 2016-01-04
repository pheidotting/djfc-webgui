define(['jquery',
        'knockout',
        'commons/3rdparty/log',
        'js/model/hypothekenEnPakketten',
        'dataServices'],
    function($, ko, log, hypothekenEnPakketten, dataServices){

    return function(relatieId) {
		log.debug("inlezen hypotheken");
		dataServices.lijstHypotheken(relatieId).done(function(hypotheken) {
			dataServices.lijstHypotheekPakketten(relatieId).done(function(pakketten) {
				log.debug("opgehaald");

				var h = new hypothekenEnPakketten(pakketten, hypotheken);

				ko.applyBindings(h);
			});
		});
	};
});