define(['jquery',
         'knockout',
         'model/bedrijf',
         'commons/commonFunctions',
         'knockoutValidation',
         'blockUI',
         'redirect'],
	function ($, ko, Bedrijf, functions, kv, blockUI, redirect) {

	return function(){
		var bedrijfLijstModel = ko.validatedObservable({

			lijst : ko.observableArray(),

			naarDetailScherm : function(relatie){
				functions.verbergMeldingen();
				$(document).ajaxStop($.unblockUI);
				$.blockUI({ message: '<img src="images/ajax-loader.gif">'});
				redirect.redirect('BEHEREN_BEDRIJF', relatie.id);
			},

			toevoegenNieuweRelatie : function(){
				functions.verbergMeldingen();
				redirect.redirect('BEHEREN_BEDRIJF', '0');
			}
		});

		return bedrijfLijstModel;
    };
});