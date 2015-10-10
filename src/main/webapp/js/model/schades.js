define(['jquery',
        'model/schade',
         'knockout',
         'commons/3rdparty/log',
         'commons/commonFunctions',
         'dataservices'],
	function ($, Schade, ko, log, commonFunctions, dataservices) {

	return function schadesModel (data, relatieId) {
		selfSchades = this;

		selfSchades.schades = ko.observableArray();
		$.each(data, function(i, item){
			selfSchades.schades.push(new Schade(item, log, relatieId));
		});

		selfSchades.verwijderPolis = function(schade){
			var r=confirm("Weet je zeker dat je deze schade wilt verwijderen?");
			if (r==true) {
				selfSchades.schades.remove(schade);
				dataservices.verwijderSchade(ko.utils.unwrapObservable(schade.id));
			}
	    };
    };
});