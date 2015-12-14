define(['jquery',
        'commons/commonFunctions',
        'model/telefoonNummer',
         'knockout',
         'commons/3rdparty/log',
         "commons/validation"],
	function ($, commonFunctions, TelefoonNummer, ko, log, validation) {

	return function contactPersoonModel (data){
	    _thisContactPersoon = this;

        _thisContactPersoon.id = ko.observable(data.id);
		_thisContactPersoon.voornaam = ko.observable(data.voornaam);
		_thisContactPersoon.tussenvoegsel = ko.observable(data.tussenvoegsel);
		_thisContactPersoon.achternaam = ko.observable(data.achternaam);
		_thisContactPersoon.emailadres = ko.observable(data.emailadres);
		_thisContactPersoon.bedrijf = ko.observable(data.bedrijf);
		_thisContactPersoon.telefoonnummers = ko.observableArray();
		if(data.telefoonnummers != null){
			$.each(data.telefoonnummers, function(i, item) {
				_thisContactPersoon.telefoonnummers().push(new TelefoonNummer(item));
			});
		}
		_thisContactPersoon.functie = ko.observable(data.functie);
		
		_thisContactPersoon.voegTelefoonNummerToe = function() {
			_thisContactPersoon.telefoonnummers().push(new TelefoonNummer(""));
			_thisContactPersoon.telefoonnummers.valueHasMutated();
		};
    };
});