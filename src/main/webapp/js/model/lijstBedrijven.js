define(['jquery',
         'knockout',
         'model/relatie',
         'commons/commonFunctions',
         'knockoutValidation',
         'blockUI',
         'redirect'],
	function ($, ko, Relatie, functions, kv, blockUI, redirect) {

	return function(){
		var relatieLijstModel = ko.validatedObservable({

			lijst : ko.observableArray(),

			naarDetailScherm : function(relatie){
				functions.verbergMeldingen();
				$(document).ajaxStop($.unblockUI);
				$.blockUI({ message: '<img src="images/ajax-loader.gif">'});
				redirect.redirect('BEHEREN_RELATIE', relatie.id);
			},

			toevoegenNieuweRelatie : function(){
				functions.verbergMeldingen();
				redirect.redirect('BEHEREN_RELATIE', '0');
			}
		});

		return relatieLijstModel;
    };
});