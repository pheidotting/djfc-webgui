define(['jquery',
         'knockout',
         'commons/3rdparty/log',
         'commons/commonFunctions',
		 'dataServices',
		 'redirect',
         'opmerkingenModel'],
	function ($, ko, log, commonFunctions, dataServices, redirect, opmerkingenModel) {

	return function bedrijfModel (data){
		_bedrijf = this;

		_bedrijf.opmerkingenModel = new opmerkingenModel(data.opmerkingen, null, null, null, null, data.id, null);

		_bedrijf.id = ko.observable(data.id);
		_bedrijf.naam = ko.observable(data.naam).extend({required: true});
		_bedrijf.kvk = ko.observable(data.kvk);
		_bedrijf.straat = ko.observable(data.straat);
		_bedrijf.huisnummer = ko.observable(data.huisnummer).extend({ number: true });
		_bedrijf.toevoeging = ko.observable(data.toevoeging);
		_bedrijf.postcode = ko.observable(data.postcode);
		_bedrijf.plaats = ko.observable(data.plaats);
		_bedrijf.relatie = ko.observable(data.relatie);

		_bedrijf.idDiv = ko.computed(function() {
	        return "collapsable" + data.id;
		}, this);
		_bedrijf.idDivLink = ko.computed(function() {
	        return "#collapsable" + data.id;
		}, this);

		_bedrijf.bewerkBedrijf = function(bedrijf){
			log.debug("Bewerk Bedrijf : " + ko.toJSON(bedrijf));
			commonFunctions.verbergMeldingen();
			redirect.redirect('BEHEREN_RELATIE', bedrijf.relatie(), 'bedrijf', bedrijf.id());
	    };

		_bedrijf.opslaan = function(bedrijf){
	    	var result = ko.validation.group(bedrijf, {deep: true});
	    	if(!bedrijf.isValid()){
	    		result.showAllMessages(true);
	    	}else{
				commonFunctions.verbergMeldingen();
				log.debug("Versturen naar ../dejonge/rest/medewerker/gebruiker/opslaanBedrijf : ");
				log.debug(ko.toJSON(_bedrijf));

				dataServices.opslaanBedrijf(ko.toJSON(bedrijf)).done(function(){
					commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
					redirect.redirect('BEHEREN_RELATIE', bedrijf.relatie(), 'bedrijven');
				}).fail(function(data){
					commonFunctions.plaatsFoutmelding(data);
				});
			}
		};

		_bedrijf.annuleren = function(){
			redirect.redirect('BEHEREN_RELATIE', _bedrijf.relatie(), 'bedrijven');
		}
    };
});