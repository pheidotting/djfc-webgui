define(['jquery',
        'commons/commonFunctions',
        'knockout',
        'model/relatie2',
        'model/contactpersoon2',
        'commons/commonFunctions',
        'commons/block',
        'commons/3rdparty/log2',
		'redirect',
        'opmerkingenModel',
        'mapper/bedrijf-mapper',
        'mapper/contactpersoon-mapper',
        'service/bedrijf-service',
        'viewmodel/common/adres-viewmodel',
        'viewmodel/common/rekeningnummer-viewmodel',
        'viewmodel/common/telefoonnummer-viewmodel',
        'viewmodel/common/opmerking-viewmodel',
        'viewmodel/common/bijlage-viewmodel'],
    function($, commonFunctions, ko, Relatie, Contactpersoon, functions, block, log, redirect, opmerkingenModel, bedrijfMapper, contactpersoonMapper, bedrijfService, adresViewModel, rekeningnummerViewModel, telefoonnummerViewModel, opmerkingViewModel, bijlageViewModel) {

    return function(id) {
        var _this = this;
        var logger = log.getLogger('beheren-relatie-viewmodel');
        var soortEntiteit = 'BEDRIJF';

        this.adressenModel          = null;
        this.rekeningnummerModel    = null;
        this.telefoonnummersModel   = null;
        this.opmerkingenModel       = null;
        this.bijlageModel           = null;
		this.bedrijf                = null;
		this.conactpersonen         = null;

		this.onderlingeRelaties = ko.observableArray();
		this.lijst = ko.observableArray();

        this.zoekTerm = function(){};
        this.zoekRelaties = function(){};

		this.voegRelatieToe = function(datum){

		};

		this.veranderDatum = function(datum){
			datum(commonFunctions.zetDatumOm(datum()));
		};

        this.init = function(id) {
            var deferred = $.Deferred();

            $.when(bedrijfService.leesBedrijf(id)).then(function(bedrijf){
                _this.bedrijf = bedrijfMapper.mapBedrijf(bedrijf);

                _this.telefoonnummersModel  = new telefoonnummerViewModel(false, soortEntiteit, id, bedrijf.telefoonnummers);
                _this.adressenModel         = new adresViewModel(false, soortEntiteit, id, bedrijf.adressen);
                _this.opmerkingenModel      = new opmerkingViewModel(false, soortEntiteit, id, bedrijf.opmerkingen);
                _this.bijlageModel          = new bijlageViewModel(false, soortEntiteit, id, bedrijf.bijlages, bedrijf.groepBijlages);

                _this.contactpersonen = contactpersoonMapper.mapContactpersonen(bedrijf.contactpersonen);

                return deferred.resolve();
            });

            return deferred.promise();
        };


        this.schermTonen = ko.computed(function(){
//            if(data.id == null || data.id === 0) {
//                return false;
//            }
            return true;
        });
        this.readOnly = ko.observable(false);
        this.notReadOnly = ko.observable(true);

		this.veranderDatum = function(datum){
    		if(datum != null) {
	    		datum(commonFunctions.zetDatumOm(datum()));
			}
		};

		this.zetPostcodeOm = function(){
			var postcode = _this.postcode();
			if(postcode !== null && postcode.length === 6){
                postcode = postcode.toUpperCase();
                postcode = postcode.substring(0, 4) + " " + postcode.substring(4);
                _this.postcode(postcode);
			}
		};

		this.naarTaak = function(taak){
		    redirect.redirect('TAAK', taak.id());
		};

		this.opslaan = function(){
	    	var result = ko.validation.group(_this, {deep: true});
	    	if(!_this.isValid()){
	    		result.showAllMessages(true);
	    	}else{
				var foutmelding;
				bedrijfService.opslaan(_this.bedrijf, _this.adressenModel.adressen, _this.telefoonnummersModel.telefoonnummers, _this.opmerkingenModel.opmerkingen, _this.contactpersonen).done(function(){
					redirect.redirect('LIJST_BEDRIJVEN');//, _this.bedrijf.naam());
					commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
				}).fail(function(response){
					commonFunctions.plaatsFoutmelding(response);
					foutmelding = true;
				});
				if(foutmelding === undefined || foutmelding === null){
					redirect.redirect('LIJST_BEDRIJVEN');//, _this.bedrijf.naam());
					commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
				}
	    	}
		};

		this.verwijderenBedrijf = function(bedrijf){
			log.debug("verwijderen Bedrijf met id " + bedrijf.id());

			dataServices.verwijderRelatie(ko.utils.unwrapObservable(bedrijf.id));
			redirect.redirect('LIJST_BEDRIJVEN');
		};

        this.annuleren = function(){
            redirect.redirect('LIJST_BEDRIJVEN');
        };

        this.voegContactpersoonToe = function(){
            _this.contactpersonen().push(new Contactpersoon(''));
            _this.contactpersonen.valueHasMutated();
        };

        this.verwijderContactpersoon = function(contactpersoon) {
            log.debug("Verwijderen contactpersoon " + ko.toJSON(contactpersoon));
            _this.contactpersonen.remove(function (item) {
                log.debug(ko.toJSON(item));
                return item.voornaam() === contactpersoon.voornaam() && item.achternaam() === contactpersoon.achternaam();
            });
            _this.contactpersonen.valueHasMutated();
        };
	};
});