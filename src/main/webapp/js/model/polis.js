define(['jquery',
         'knockout',
         'commons/3rdparty/log',
         'commons/commonFunctions',
         'moment',
         'model/bijlage',
         "commons/opmaak",
         'dataServices',
         'navRegister',
         'redirect',
         'fileUpload',
         'opmerkingenModel'],
	function ($, ko, log, commonFunctions, moment, Bijlage, opmaak, dataServices, navRegister, redirect, fileUpload, opmerkingenModel) {

	return function polisModel (data){
		var _polis = this;

		_polis.opmerkingenModel = new opmerkingenModel(data.opmerkingen, null, null, data.id, null);

		_polis.veranderDatum = function(datum){
			datum(commonFunctions.zetDatumOm(datum()));
		};
		_polis.berekenProlongatieDatum = function(){
			if(_polis.ingangsDatum() != null && _polis.ingangsDatum() != ""){
				_polis.prolongatieDatum(moment(_polis.ingangsDatum(), "DD-MM-YYYY").add(1, 'y').format("DD-MM-YYYY"));
			}
		};
		_polis.bedrag = function(bedrag){
			return opmaak.maakBedragOp(ko.utils.unwrapObservable(bedrag));
		};
		_polis.relatie = ko.observable(data.relatie);
		_polis.id = ko.observable(data.id);
		_polis.soortEntiteit = ko.observable('Polis');
		_polis.status = ko.observable(data.status);
		_polis.polisNummer = ko.observable(data.polisNummer).extend({required: true});
		_polis.kenmerk = ko.observable(data.kenmerk);
		if(data.ingangsDatum != undefined){
			_polis.ingangsDatum = ko.observable(moment(data.ingangsDatum).format("DD-MM-YYYY")).extend({required: true});
		}else{
			_polis.ingangsDatum = ko.observable().extend({required: true});
		}
		if(data.eindDatum != undefined){
			_polis.eindDatum = ko.observable(moment(data.eindDatum).format("DD-MM-YYYY"));
		}else{
			_polis.eindDatum = ko.observable();
		}
		if(data.wijzigingsDatum != undefined){
			_polis.wijzigingsDatum = ko.observable(moment(data.wijzigingsDatum).format("DD-MM-YYYY"));
		}else{
			_polis.wijzigingsDatum = ko.observable();
		}
		if(data.prolongatieDatum != undefined){
			_polis.prolongatieDatum = ko.observable(moment(data.prolongatieDatum).format("DD-MM-YYYY"));
		}else{
			_polis.prolongatieDatum = ko.observable();
		}
		_polis.maatschappij = ko.observable(data.maatschappij).extend({required: true});
		_polis.soort = ko.observable(data.soort).extend({required: true});
		_polis.premie = ko.observable(data.premie);
		_polis.betaalfrequentie = ko.observable(data.betaalfrequentie);
		_polis.dekking = ko.observable(data.dekking);
		_polis.bedrijf = ko.observable(data.bedrijf);
		_polis.omschrijvingVerzekering = ko.observable(data.omschrijvingVerzekering);
		_polis.idDiv = ko.computed(function() {
	        return "collapsable" + data.id;
		}, this);
		_polis.idDivLink = ko.computed(function() {
	        return "#collapsable" + data.id;
		}, this);
		_polis.className = ko.computed(function() {
			var datum = moment(data.ingangsDatum);
			var tijd = moment(datum).fromNow();
			if(tijd.substr(tijd.length - 3) == "ago"){
			}else{
				return "polisNietActief panel-title";
			}
			if(data.eindDatum){
				datum = moment(data.eindDatum);
				tijd = moment(datum).fromNow();
				if(tijd.substr(tijd.length - 3) == "ago"){
					return "polisBeeindigd panel-title";
				}else{
					return "panel-title";
				}
			}
		}, this);
		_polis.titel = ko.computed(function () {
			return data.soort + " (" + data.polisNummer + ")";
		}, this);
		_polis.bijlages = ko.observableArray();
		if(data.bijlages != null){
			$.each(data.bijlages, function(i, item){
				var bijlage = new Bijlage(item);
				_polis.bijlages().push(bijlage);
			});
		};

	    _polis.schadeMeldenBijPolis = function(polis){
			log.debug(ko.utils.unwrapObservable(polis.id));
			log.debug($('#polisVoorSchademelding').val());
	    };

	    _polis.bewerkPolis = function(polis){
			commonFunctions.verbergMeldingen();
			log.debug("Polis bewerken met id " + polis.id() + " en Relatie id : " + polis.relatie());
			redirect.redirect('BEHEREN_RELATIE', polis.relatie(), 'polis', polis.id());
	    };

	    _polis.beeindigPolis = function(polis){
	    	dataServices.beindigPolis(polis.id());
			_polis.eindDatum(moment().format("DD-MM-YYYY"));
	    };

	    _polis.verwijderBijlage = function(bijlage){
			commonFunctions.verbergMeldingen();
			var r=confirm("Weet je zeker dat je deze bijlage wilt verwijderen?");
			if (r==true) {
				_polis.bijlages.remove(bijlage);
				dataServices.verwijderBijlage(bijlage.id());
			}
		};

		_polis.nieuwePolisUpload = function (){
			log.debug("Nieuwe polis upload");
            commonFunctions.verbergMeldingen();
			$('uploadprogress').show();

            if(_polis.soort() == ""){
                $('#bijlageFile').val("");
                commonFunctions.plaatsFoutmeldingString("Kies eerst een soort polis");
            } else {
                if(_polis.id() == null){
                    dataServices.opslaanPolis(ko.toJSON(_polis)).done(function(data){
                        _polis.id(data.foutmelding);
                        _polis.id.valueHasMutated();

                        fileUpload.uploaden().done(function(bijlage){
                            console.log(ko.toJSON(bijlage));
                            _polis.bijlages().push(bijlage);
                            _polis.bijlages.valueHasMutated();
                            redirect.redirect('BEHEREN_RELATIE', _polis.relatie(), 'polis', _polis.id());
                        });
                    });
                } else {
                    fileUpload.uploaden().done(function(bijlage){
                        console.log(ko.toJSON(bijlage));
                        _polis.bijlages().push(bijlage);
                        _polis.bijlages.valueHasMutated();
                    });
                }
            }
		};

	    _polis.opslaan = function(polis){
	    	var result = ko.validation.group(polis, {deep: true});
	    	if(!polis.isValid()){
	    		result.showAllMessages(true);
	    	}else{
	    		commonFunctions.verbergMeldingen();
	    		log.debug("versturen naar " + navRegister.bepaalUrl('OPSLAAN_POLIS'));
	    		log.debug(ko.toJSON(polis));
	    		dataServices.opslaanPolis(ko.toJSON(polis)).done(function(){
					commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
					redirect.redirect('BEHEREN_RELATIE', polis.relatie(), 'polissen');
	    		}).fail(function(data){
					commonFunctions.plaatsFoutmelding(data);
	    		});
	    	}
		};

		_polis.annuleren = function(){
			redirect.redirect('BEHEREN_RELATIE', _polis.relatie(), 'polissen');
		};
    };
});