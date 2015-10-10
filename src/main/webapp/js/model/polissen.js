define(['jquery',
        'model/polis',
         'knockout',
         'commons/3rdparty/log',
         'commons/commonFunctions',
         'dataservices'],
	function ($, Polis, ko, log, commonFunctions, dataservices) {

	return function polissenModel (data, relatieId) {
		_thisPolissen = this;

		_thisPolissen.polissen = ko.observableArray();
		$.each(data, function(i, item){
			_thisPolissen.polissen.push(new Polis(item, relatieId));
		});

	    _thisPolissen.verwijderPolis = function(polis){
	    	commonFunctions.verbergMeldingen();
			var r=confirm("Weet je zeker dat je deze polis wilt verwijderen?");
			if (r==true) {
				_thisPolissen.polissen.remove(polis);
				dataservices.verwijderPolis(ko.utils.unwrapObservable(polis.id));
			}
	    };
    };
});