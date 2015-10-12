define(['jquery',
         'knockout',
         'commons/commonFunctions',
         'commons/block',
         'dataServices',
         'redirect'],
	function ($, ko, commonFunctions, block, dataServices, redirect) {

	return function(){
		var inlogModel = ko.validatedObservable({
			identificatie : ko.observable().extend({ required: true }),
			wachtwoord : ko.observable().extend({ required: true }),
			onthouden : ko.observable('false'),

			inloggen : function(){
				commonFunctions.verbergMeldingen();
				if(this.isValid()){
					block.block();
					dataServices.inloggen(ko.toJSON(this)).done(function(){
						commonFunctions.haalIngelogdeGebruiker();
						redirect.redirect('DASHBOARD');
					}).fail(function(result){
						commonFunctions.plaatsFoutmelding(result);
					});
				}
			}
		});
		return inlogModel;
    };
});