define(['knockout',
        'commons/validation'],
	function (ko, validation) {

	return function (data, openstaandeTaken){
		var _this = this;

		_this.identificatie = ko.observable().extend({email: true});
		_this.id = ko.observable();
		_this.soortEntiteit = ko.observable('RELATIE');
		_this.voornaam = ko.observable().extend({required: true});
		_this.roepnaam = ko.observable();
		_this.tussenvoegsel = ko.observable();
		_this.achternaam = ko.observable().extend({required: true});
		_this.bsn = ko.observable();
		_this.geboorteDatum = ko.observable().extend({validation: {
	        validator: function (val) {
	        	if(val !== undefined){
	        		return validation.valideerDatum(val);
	        	}else{
	        		return true;
	        	}
	        },
	        message: 'Juiste invoerformaat is : dd-mm-eejj'
	    }});
		_this.overlijdensdatum = ko.observable();
		_this.geslacht = ko.observable();
		_this.burgerlijkeStaat = ko.observable();
    };
});