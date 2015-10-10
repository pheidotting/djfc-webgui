define(['jquery',
        'knockout',
        'commons/3rdparty/log',
        'js/model/hypothekenEnPakketten',
        'dataservices'],
	function($, ko, log, hypothekenEnPakketten, dataservices){

	return function(relatieId) {
		log.debug("inlezen hypotheken");
		dataservices.lijstHypotheken(relatieId).done(function(hypotheken) {
			dataservices.lijstHypotheekPakketten(relatieId).done(function(pakketten) {
				log.debug("opgehaald");

				var h = new hypothekenEnPakketten(pakketten, hypotheken);

				ko.applyBindings(h);
			});
		});
	};
});