define(['jquery',
         'knockout',
         'commons/3rdparty/log',
         'commons/commonFunctions',
         'model/bijlage',
		 'dataServices',
		 'redirect',
         'fileUpload',
         'opmerkingenModel'],
	function ($, ko, log, commonFunctions, Bijlage, dataServices, redirect, fileUpload, opmerkingenModel) {

	return function bedrijfModel (data){
		_bedrijf = this;

		_bedrijf.opmerkingenModel = new opmerkingenModel(data.opmerkingen, null, null, null, null, data.id, null);

        _bedrijf.readOnly = ko.observable(false);
        _bedrijf.notReadOnly = ko.observable(true);

		_bedrijf.id = ko.observable(data.id);
		_bedrijf.naam = ko.observable(data.naam).extend({required: true});
		_bedrijf.kvk = ko.observable(data.kvk);
		_bedrijf.straat = ko.observable(data.straat);
		_bedrijf.huisnummer = ko.observable(data.huisnummer).extend({ number: true });
		_bedrijf.toevoeging = ko.observable(data.toevoeging);
		_bedrijf.postcode = ko.observable(data.postcode);
		_bedrijf.plaats = ko.observable(data.plaats);
		_bedrijf.relatie = ko.observable(data.relatie);
		_bedrijf.bijlages = ko.observableArray();
		if(data.bijlages != null){
			$.each(data.bijlages, function(i, item){
				var bijlage = new Bijlage(item);
				_bedrijf.bijlages().push(bijlage);
			});
		};
		_bedrijf.soortEntiteit = ko.observable('Bedrijf');

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

	    _bedrijf.verwijderBijlage = function(bijlage){
			commonFunctions.verbergMeldingen();
			var r=confirm("Weet je zeker dat je deze bijlage wilt verwijderen?");
			if (r==true) {
				_bedrijf.bijlages.remove(bijlage);
				dataServices.verwijderBijlage(bijlage.id());
			}
		};

		_bedrijf.nieuwePolisUpload = function (){
			log.debug("Nieuwe polis upload");
            commonFunctions.verbergMeldingen();
			$('uploadprogress').show();

			if(_bedrijf.id() == null){
				dataServices.opslaanPolis(ko.toJSON(_polis)).done(function(data){
					_bedrijf.id(data.foutmelding);
					_bedrijf.id.valueHasMutated();

					fileUpload.uploaden().done(function(bijlage){
						console.log(ko.toJSON(bijlage));
						_bedrijf.bijlages().push(bijlage);
						_bedrijf.bijlages.valueHasMutated();
						redirect.redirect('BEHEREN_RELATIE', _polis.relatie(), 'polis', _polis.id());
					});
				});
			} else {
				fileUpload.uploaden().done(function(bijlage){
					console.log(ko.toJSON(bijlage));
					_bedrijf.bijlages().push(bijlage);
					_bedrijf.bijlages.valueHasMutated();
				});
			}
		};

		_bedrijf.annuleren = function(){
			redirect.redirect('BEHEREN_RELATIE', _bedrijf.relatie(), 'bedrijven');
		}
    };
});