define(['jquery',
        'commons/commonFunctions',
        'knockout',
        'model/rekeningNummer',
        'model/telefoonNummer',
        'model/onderlingeRelatie',
        'model/adres',
        'model/bijlage',
        'model/groepbijlages',
        'js/model/taak/taak',
        'moment',
        'commons/3rdparty/log',
        'commons/validation',
        'dataServices',
        'navRegister',
        'redirect',
        'fileUpload',
        'opmerkingenModel'],
	function ($, commonFunctions, ko, RekeningNummer, TelefoonNummer, OnderlingeRelatie, Adres, Bijlage, GroepBijlages, Taak, moment, log, validation, dataServices, navRegister, redirect, fileUpload, opmerkingenModel) {

	return function (data, openstaandeTaken){
		var _thisRelatie = this;

        _thisRelatie.schermTonen = ko.computed(function(){
            if(data.id == null || data.id === 0) {
                return false;
            }
            return true;
        });
		_thisRelatie.opmerkingenModel = new opmerkingenModel(data.opmerkingen, null, null, null, data.id);
        _thisRelatie.readOnly = ko.observable(false);
        _thisRelatie.notReadOnly = ko.observable(true);

		_thisRelatie.veranderDatum = function(datum){
			datum(commonFunctions.zetDatumOm(datum()));
		};
		_thisRelatie.zetPostcodeOm = function(){
			var postcode = _thisRelatie.postcode();
			if(postcode !== null && postcode.length === 6){
                postcode = postcode.toUpperCase();
                postcode = postcode.substring(0, 4) + " " + postcode.substring(4);
                _thisRelatie.postcode(postcode);
			}
		};
		_thisRelatie.identificatie = ko.observable(data.identificatie).extend({email: true});
		_thisRelatie.id = ko.observable(data.id);
		_thisRelatie.soortEntiteit = ko.observable('Relatie');
		_thisRelatie.voornaam = ko.observable(data.voornaam).extend({required: true});
		_thisRelatie.roepnaam = ko.observable(data.roepnaam);
		_thisRelatie.tussenvoegsel = ko.observable(data.tussenvoegsel);
		_thisRelatie.achternaam = ko.observable(data.achternaam).extend({required: true});
		_thisRelatie.zoekTerm = ko.observable();

		_thisRelatie.openstaandeTaken = ko.observableArray();
		if(openstaandeTaken != null){
			$.each(openstaandeTaken, function(i, item) {
				_thisRelatie.openstaandeTaken().push(new Taak(item));
			});
		};

		_thisRelatie.naarTaak = function(taak){
		    redirect.redirect('TAAK', taak.id());
		};

		_thisRelatie.adressen = ko.observableArray();
		if(data.adressen != null){
			$.each(data.adressen, function(i, item) {
				_thisRelatie.adressen().push(new Adres(item));
			});
		};

		_thisRelatie.adresOpgemaakt = ko.computed(function() {
		    log.debug('adresOpgemaakt');

		    var adres = null;
		    $.each(_thisRelatie.adressen(), function(index, item){
		        log.debug(item);
		        if(item.soortAdres() === 'WOONADRES') {
		            adres = item;
		        }
		        if(adres == null) {
                    if(item.soortAdres() === 'POSTADRES') {
                        adres = item;
                    }
}
		    });

		    if(adres !== null) {
		        return adres.straat() + ' ' + adres.huisnummer() + ', ' + adres.plaats();
		    } else {
		        return '';
		    }
		});

		_thisRelatie.voegAdresToe = function(){
			log.debug("nieuwe Adres");
			_thisRelatie.adressen().push(new Adres(""));
			_thisRelatie.adressen.valueHasMutated();
		};

		_thisRelatie.verwijderAdres = function(adres){
			log.debug(ko.toJSON(adres));
			_thisRelatie.adressen.remove(adres);
			_thisRelatie.adressen.valueHasMutated();
		};

		_thisRelatie.bsn = ko.observable(data.bsn);
		_thisRelatie.zakelijkeKlant = ko.observable(data.zakelijkeKlant);
		_thisRelatie.rekeningnummers = ko.observableArray();
		if(data.rekeningnummers != null){
			$.each(data.rekeningnummers, function(i, item) {
				_thisRelatie.rekeningnummers().push(new RekeningNummer(item));
			});
		}
		_thisRelatie.telefoonnummers = ko.observableArray();
		if(data.telefoonnummers != null){
			$.each(data.telefoonnummers, function(i, item) {
				_thisRelatie.telefoonnummers().push(new TelefoonNummer(item));
			});
		}
		_thisRelatie.onderlingeRelaties = ko.observableArray();
		if(data.onderlingeRelaties != null){
			$.each(data.onderlingeRelaties, function(i, item) {
				_thisRelatie.onderlingeRelaties().push(new OnderlingeRelatie(item));
			});
		}

		_thisRelatie.voegRelatieToe = function(){
    		_thisRelatie.lijst.removeAll();
			$("#onderlingeRelatieDialog").dialog();
		};

		_thisRelatie.opslaanOnderlingeRelatie = function(ol) {
            $('#foutmeldingGeenSoortRelatie').hide();
		    if($('#soortRelatie').val() === ""){
		        $('#foutmeldingGeenSoortRelatie').show();
		    } else {
	    		$("#onderlingeRelatieDialog").dialog("close");
                dataServices.koppelOnderlingeRelatie(_thisRelatie.id(), ol.id, $('#soortRelatie').val());

                var onderlingeRelatie = new OnderlingeRelatie('');
                onderlingeRelatie.relatieMet(ol.voornaam + ' ' + ol.achternaam);
                onderlingeRelatie.idRelatieMet(ol.id);
                onderlingeRelatie.soortRelatie($('#soortRelatie option:selected').text());

				_thisRelatie.onderlingeRelaties().push(onderlingeRelatie);
				_thisRelatie.onderlingeRelaties.valueHasMutated();
		    };
		};

		_thisRelatie.lijst = ko.observableArray();

		_thisRelatie.zoekRelaties = function(){
    		_thisRelatie.lijst.removeAll();
            dataServices.lijstRelaties(_thisRelatie.zoekTerm(), _thisRelatie.id()).done(function(data) {
                log.debug("opgehaald " + JSON.stringify(data));
                if(data !== undefined){
                    $.each(data.jsonRelaties, function(i, item) {
                        log.debug(JSON.stringify(item));
                        var a = item;
                        _thisRelatie.lijst().push(a);
                    });
                    _thisRelatie.lijst.valueHasMutated();
                }
            });
		};

		_thisRelatie.geboorteDatum = ko.observable(data.geboorteDatum).extend({validation: {
	        validator: function (val) {
	        	if(val !== undefined){
	        		return validation.valideerDatum(val);
	        	}else{
	        		return true;
	        	}
	        },
	        message: 'Juiste invoerformaat is : dd-mm-eejj'
	    }});
		_thisRelatie.overlijdensdatum = ko.observable(data.overlijdensdatum);
		_thisRelatie.geslacht = ko.observable(data.geslacht);
		_thisRelatie.burgerlijkeStaat = ko.observable(data.burgerlijkeStaat);

		_thisRelatie.voegRekeningToe = function() {
			_thisRelatie.rekeningnummers().push(new RekeningNummer(""));
			_thisRelatie.rekeningnummers.valueHasMutated();
		};

		_thisRelatie.verwijderRekening = function(rekening){
			log.debug("Verwijderen rekening " + ko.toJSON(rekening));
			_thisRelatie.rekeningnummers.remove(function (item) {
			    return item.rekeningnummer() === rekening.rekeningnummer() && item.bic() === rekening.bic();
			});
			_thisRelatie.rekeningnummers.valueHasMutated();
		};

		_thisRelatie.voegTelefoonNummerToe = function() {
			_thisRelatie.telefoonnummers().push(new TelefoonNummer(""));
			_thisRelatie.telefoonnummers.valueHasMutated();
		};

		_thisRelatie.verwijderTelefoonNummer = function(telefoon) {
			log.debug("Verwijderen telefoon " + ko.toJSON(telefoon));
			_thisRelatie.telefoonnummers.remove(function (item) {
                return item.telefoonnummer() === telefoon.telefoonnummer() && item.soort() === telefoon.soort();
            });
			_thisRelatie.telefoonnummers.valueHasMutated();
		};

		_thisRelatie.bijlages = ko.observableArray();
		if(data.bijlages != null){
			$.each(data.bijlages, function(i, item){
				var bijlage = new Bijlage(item);
				_thisRelatie.bijlages().push(bijlage);
			});
		};

		_thisRelatie.groepBijlages = ko.observableArray();
		if(data.groepBijlages != null){
			$.each(data.groepBijlages, function(i, item){
				var groepBijlages = new GroepBijlages(item);
				_thisRelatie.groepBijlages().push(groepBijlages);
			});
		};

		_thisRelatie.nieuwePolisUpload = function (){
			log.debug("Nieuwe bijlage upload");
			$('uploadprogress').show();

            fileUpload.uploaden().done(function(uploadResultaat){
                log.debug(ko.toJSON(uploadResultaat));

                if(uploadResultaat.bestandsNaam == null) {
                    _thisRelatie.groepBijlages().push(uploadResultaat);
                    _thisRelatie.groepBijlages.valueHasMutated();
                } else {
                    _thisRelatie.bijlages().push(uploadResultaat);
                    _thisRelatie.bijlages.valueHasMutated();
                }
            });
		};

		_thisRelatie.opslaan = function(){
	    	var result = ko.validation.group(_thisRelatie, {deep: true});
	    	if(!_thisRelatie.isValid()){
	    		result.showAllMessages(true);
	    	}else{
    			$.each(_thisRelatie.telefoonnummers(), function(i, item){
    			    item.telefoonnummer(item.telefoonnummer().replace(/ /g, "").replace("-", ""));
    			    item.soortEntiteit('RELATIE');
    			    item.entiteitId(_thisRelatie.id());
    			});
    			$.each(_thisRelatie.rekeningnummers(), function(i, item){
    			    item.rekeningnummer(item.rekeningnummer().replace(/ /g, ""));
    			    item.soortEntiteit('RELATIE');
    			    item.entiteitId(_thisRelatie.id());
    			});
    			$.each(_thisRelatie.adressen(), function(i, item){
    			    item.soortEntiteit('RELATIE');
    			    item.entiteitId(_thisRelatie.id());
    			});
				commonFunctions.verbergMeldingen();
				var foutmelding;
				dataServices.opslaanRelatie(_thisRelatie).done(function(){
					redirect.redirect('LIJST_RELATIES', _thisRelatie.achternaam());
					commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
				}).fail(function(response){
					commonFunctions.plaatsFoutmelding(response);
					foutmelding = true;
				});
				if(foutmelding === undefined || foutmelding === null){
					redirect.redirect('LIJST_RELATIES', _thisRelatie.achternaam());
					commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
				}
	    	}
		};

	    _thisRelatie.verwijderBijlage = function(bijlage){
			commonFunctions.verbergMeldingen();
			var r=confirm("Weet je zeker dat je deze bijlage wilt verwijderen?");
			if (r === true) {
				_thisRelatie.bijlages.remove(bijlage);
				dataServices.verwijderBijlage(bijlage.id());
			}
		};

		_thisRelatie.verwijderenRelatie = function(relatie){
			log.debug("verwijderen Relatie met id " + relatie.id());

			dataServices.verwijderRelatie(ko.utils.unwrapObservable(relatie.id));
			redirect.redirect('LIJST_RELATIES');
		};

		_thisRelatie.naarDetailScherm = function(relatie){
			commonFunctions.verbergMeldingen();
			redirect.redirect('BEHEREN_RELATIE', ko.utils.unwrapObservable(relatie.id));
		};

        _thisRelatie.opzoekenAdres = function(adres){
            log.debug(ko.toJSON(adres));
            adres.postcode(adres.postcode().toUpperCase().replace(" ", ""));

            dataServices.ophalenAdresOpPostcode(adres.postcode(), adres.huisnummer()).done(function(data){
                log.debug(JSON.stringify(data));
				adres.straat(data.straat);
				adres.plaats(data.plaats);
				adres.postcode(adres.zetPostcodeOm(adres.postcode()));
            }).fail(function(data){
                log.debug(JSON.stringify(data));
                adres.straat('');
                adres.plaats('');
            });
        };

        _thisRelatie.annuleren = function(){
            redirect.redirect('LIJST_RELATIES');
        };
    };
});