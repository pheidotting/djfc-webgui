define(['jquery',
        'commons/commonFunctions',
        'knockout',
        'model/rekeningNummer',
        'model/telefoonNummer',
        'model/adres',
        'model/bijlage',
        'moment',
        'commons/3rdparty/log',
        'commons/validation',
        'dataServices',
        'navRegister',
        'redirect',
        'fileUpload',
        'opmerkingenModel'],
	function ($, commonFunctions, ko, RekeningNummer, TelefoonNummer, Adres, Bijlage, moment, log, validation, dataServices, navRegister, redirect, fileUpload, opmerkingenModel) {

	return function relatieModel (data){
		_thisRelatie = this;

		_thisRelatie.opmerkingenModel = new opmerkingenModel(data.opmerkingen, null, null, null, data.id);

		_thisRelatie.veranderDatum = function(datum){
			datum(commonFunctions.zetDatumOm(datum()));
		};
		_thisRelatie.zetPostcodeOm = function(){
			var postcode = _thisRelatie.postcode();
			if(postcode != null){
				if(postcode.length == 6){
					postcode = postcode.toUpperCase();
					postcode = postcode.substring(0, 4) + " " + postcode.substring(4);
					_thisRelatie.postcode(postcode);
				}
			}
		};
		_thisRelatie.identificatie = ko.observable(data.identificatie).extend({email: true});
		_thisRelatie.id = ko.observable(data.id);
		_thisRelatie.soortEntiteit = ko.observable('Relatie');
		_thisRelatie.voornaam = ko.observable(data.voornaam).extend({required: true});
		_thisRelatie.roepnaam = ko.observable(data.roepnaam);
		_thisRelatie.tussenvoegsel = ko.observable(data.tussenvoegsel);
		_thisRelatie.achternaam = ko.observable(data.achternaam).extend({required: true});

		_thisRelatie.adressen = ko.observableArray();
		if(data.adressen != null){
			$.each(data.adressen, function(i, item) {
				_thisRelatie.adressen().push(new Adres(item));
			});
		}

		_thisRelatie.voegAdresToe = function(){
			log.debug("nieuwe Adres");
			_thisRelatie.adressen().push(new Adres(""));
			_thisRelatie.adressen.valueHasMutated();
		}

		_thisRelatie.verwijderAdres = function(adres){
			log.debug(ko.toJSON(adres));
			_thisRelatie.adressen.remove(adres);
			_thisRelatie.adressen.valueHasMutated();
		}

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
		_thisRelatie.geboorteDatum = ko.observable(data.geboorteDatumOpgemaakt).extend({validation: {
	        validator: function (val) {
	        	if(val != undefined){
	        		return validation.valideerDatum(val);
	        	}else{
	        		return true;
	        	}
	        },
	        message: 'Juiste invoerformaat is : dd-mm-eejj'
	    }});
		_thisRelatie.overlijdensdatum = ko.observable(data.overlijdensdatumOpgemaakt);
		_thisRelatie.geslacht = ko.observable(data.geslacht);
		_thisRelatie.burgerlijkeStaat = ko.observable(data.burgerlijkeStaat);

		_thisRelatie.voegRekeningToe = function() {
			_thisRelatie.rekeningnummers().push(new RekeningNummer(""));
			_thisRelatie.rekeningnummers.valueHasMutated();
		};

		_thisRelatie.verwijderRekening = function(nummer){
//			_thisRelatie.rekeningnummers().remove(nummer);
			_thisRelatie.rekeningnummers.valueHasMutated();
		};

		_thisRelatie.voegTelefoonNummerToe = function() {
			_thisRelatie.telefoonnummers().push(new TelefoonNummer(""));
			_thisRelatie.telefoonnummers.valueHasMutated();
		};

		_thisRelatie.verwijderTelefoonNummer = function(telefoon) {
//			_thisRelatie.telefoonnummers().remove(telefoon);
			_thisRelatie.telefoonnummers.valueHasMutated();
		};

		_thisRelatie.bijlages = ko.observableArray();
		if(data.bijlages != null){
			$.each(data.bijlages, function(i, item){
				var bijlage = new Bijlage(item);
				_thisRelatie.bijlages().push(bijlage);
			});
		};

		_thisRelatie.nieuwePolisUpload = function (){
			log.debug("Nieuwe bijlage upload");
			$('uploadprogress').show();

            if(_thisRelatie.id() == null){
        		dataServices.opslaanRelatie(ko.toJSON(_thisRelatie)).done(function(data){
	    			_thisRelatie.id(data.foutmelding);
                    _thisRelatie.id.valueHasMutated();

					fileUpload.uploaden().done(function(bijlage){
						console.log(ko.toJSON(bijlage));
						_thisRelatie.bijlages().push(bijlage);
						_thisRelatie.bijlages.valueHasMutated();
						redirect.redirect('BEHEREN_RELATIE', _thisRelatie.id());
					});
	    		});
            } else {
				fileUpload.uploaden().done(function(bijlage){
					console.log(ko.toJSON(bijlage));
					_thisRelatie.bijlages().push(bijlage);
					_thisRelatie.bijlages.valueHasMutated();
				});
			}
		};

		_thisRelatie.opslaan = function(){
	    	var result = ko.validation.group(_thisRelatie, {deep: true});
	    	if(!_thisRelatie.isValid()){
	    		result.showAllMessages(true);
	    	}else{
				commonFunctions.verbergMeldingen();
				log.debug("Versturen naar ../dejonge/rest/medewerker/gebruiker/opslaan : ");
				log.debug(ko.toJSON(_thisRelatie));
				var foutmelding;
				dataServices.opslaanRelatie(ko.toJSON(_thisRelatie)).done(function(response){
					redirect.redirect('LIJST_RELATIES');
					commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
				}).fail(function(response){
					commonFunctions.plaatsFoutmelding(data);
					foutmelding = true;
				});
				if(foutmelding == undefined || foutmelding == null){
					redirect.redirect('LIJST_RELATIES');
					commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
				}
	    	}
		};

		_thisRelatie.verwijderenRelatie = function(relatie){
			log.debug("verwijderen Relatie met id " + relatie.id());

			dataServices.verwijderRelatie(ko.utils.unwrapObservable(relatie.id));
			redirect.redirect('LIJST_RELATIES');
		},

		_thisRelatie.naarDetailScherm = function(relatie){
			commonFunctions.verbergMeldingen();
			redirect.redirect('BEHEREN_RELATIE', ko.utils.unwrapObservable(relatie.id));
		}

        _thisRelatie.opzoekenAdres = function(adres){
            log.debug(ko.toJSON(adres));
            adres.postcode(adres.postcode().toUpperCase().replace(" ", ""));

            dataServices.ophalenAdresOpPostcode(adres.postcode(), adres.huisnummer()).done(function(data){
                log.debug(JSON.stringify(data));
                if(data.resource!=undefined) {
                    adres.straat(data.resource.street);
                    adres.plaats(data.resource.town);
                    adres.postcode(adres.zetPostcodeOm(adres.postcode()));
                } else {
                    adres.straat('');
                    adres.plaats('');
                }
            }).fail(function(data){
                log.debug(JSON.stringify(data));
                adres.straat('');
                adres.plaats('');
            });
        };
    };
});