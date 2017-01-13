define(['jquery',
        'commons/commonFunctions',
        'knockout',
        'model/relatie',
        'commons/commonFunctions',
        'commons/block',
        'commons/3rdparty/log2',
		'redirect',
        'opmerkingenModel',
        'mapper/relatie-mapper',
        'service/gebruiker-service',
        'service/toggle-service',
        'viewmodel/common/adres-viewmodel',
        'viewmodel/common/rekeningnummer-viewmodel',
        'viewmodel/common/telefoonnummer-viewmodel',
        'viewmodel/common/opmerking-viewmodel',
        'viewmodel/common/bijlage-viewmodel',
        'viewmodel/common/taak-viewmodel',
        'viewmodel/common/telefonie-viewmodel'],
    function($, commonFunctions, ko, Relatie, functions, block, log, redirect, opmerkingenModel, relatieMapper, gebruikerService, toggleService, adresViewModel, rekeningnummerViewModel, telefoonnummerViewModel, opmerkingViewModel, bijlageViewModel, taakViewModel, telefonieViewModel) {

    return function(id) {
        var _this = this;
        var logger = log.getLogger('beheren-relatie-viewmodel');
        var soortEntiteit = 'RELATIE';

        this.adressenModel          = null;
        this.rekeningnummerModel    = null;
        this.telefoonnummersModel   = null;
        this.opmerkingenModel       = null;
        this.bijlageModel           = null;
		this.taakModel              = null;
		this.relatie                = null;
		this.telefonie              = null;

		this.onderlingeRelaties = ko.observableArray();
		this.lijst = ko.observableArray();

        this.zoekTerm = function() {};
        this.zoekRelaties = function() {};

		this.voegRelatieToe = function(datum) {

		};

		this.veranderDatum = function(datum) {
			datum(commonFunctions.zetDatumOm(datum()));
		};

        this.init = function(id, toggleBeschikbaar) {
            var deferred = $.Deferred();

            $.when(gebruikerService.leesRelatie(id)).then(function(relatie) {

                _this.relatie = relatieMapper.mapRelatie(relatie);

                _this.telefoonnummersModel  = new telefoonnummerViewModel(false, soortEntiteit, id, relatie.telefoonnummers);
                _this.rekeningnummerModel   = new rekeningnummerViewModel(false, soortEntiteit, id, relatie.rekeningnummers);
                _this.adressenModel         = new adresViewModel(false, soortEntiteit, id, relatie.adressen);
                _this.opmerkingenModel      = new opmerkingViewModel(false, soortEntiteit, id, relatie.opmerkingen);
                _this.bijlageModel          = new bijlageViewModel(false, soortEntiteit, id, relatie.bijlages, relatie.groepBijlages);

                _this.telefonie = new telefonieViewModel(relatie.telefoonnummers);

                $.when(toggleService.isFeatureBeschikbaar('TODOIST')).then(function(toggleBeschikbaar){
                    if(toggleBeschikbaar) {
                        _this.taakModel             = new taakViewModel(false, soortEntiteit, id);

                        return deferred.resolve();
                    } else {
                        return deferred.resolve();
                    }
                });
            });

            return deferred.promise();
        };


        this.schermTonen = ko.computed(function() {
            return true;
        });
        this.readOnly = ko.observable(false);
        this.notReadOnly = ko.observable(true);

		this.veranderDatum = function(datum) {
    		if(datum != null) {
	    		datum(commonFunctions.zetDatumOm(datum()));
			}
		};

		this.zetPostcodeOm = function() {
			var postcode = _this.postcode();
			if(postcode !== null && postcode.length === 6) {
                postcode = postcode.toUpperCase();
                postcode = postcode.substring(0, 4) + " " + postcode.substring(4);
                _this.postcode(postcode);
			}
		};

		this.naarTaak = function(taak) {
		    redirect.redirect('TAAK', taak.id());
		};

		this.opslaan = function() {
	    	var result = ko.validation.group(_this, {deep: true});
	    	if(!_this.isValid()) {
	    		result.showAllMessages(true);
	    	}else{
				var foutmelding;
				gebruikerService.opslaan(_this.relatie, _this.adressenModel.adressen, _this.telefoonnummersModel.telefoonnummers, _this.rekeningnummerModel.rekeningnummers, _this.opmerkingenModel.opmerkingen).done(function() {
					redirect.redirect('LIJST_RELATIES', _this.relatie.achternaam());
					commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
				}).fail(function(response) {
					commonFunctions.plaatsFoutmelding(response);
					foutmelding = true;
				});
				if(foutmelding === undefined || foutmelding === null) {
					redirect.redirect('LIJST_RELATIES', _this.relatie.achternaam());
					commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
				}
	    	}
		};

		this.verwijderenRelatie = function(relatie) {
			logger.debug("verwijderen Relatie met id " + _this.relatie.id());

			gebruikerService.verwijderRelatie(_this.relatie.id()).done(function() {
    			redirect.redirect('LIJST_RELATIES');
			});
		};

        this.annuleren = function() {
            redirect.redirect('LIJST_RELATIES');
        };
	};
});