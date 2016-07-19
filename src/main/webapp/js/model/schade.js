define(['jquery',
         'knockout',
         'commons/3rdparty/log',
         'commons/commonFunctions',
         'moment',
         'model/bijlage',
         'model/groepbijlages',
         'model/opmerking',
         "commons/opmaak",
         'dataServices',
         'redirect',
         'fileUpload',
         'opmerkingenModel'],
	function ($, ko, log, commonFunctions, moment, Bijlage, GroepBijlages, Opmerking, opmaak, dataServices, redirect, fileUpload, opmerkingenModel) {

	return function schadeModel (data, relatieId){
		self = this;

		self.opmerkingenModel = new opmerkingenModel(data.opmerkingen, data.id, null, null, null);

        self.readOnly = ko.observable(false);
        self.notReadOnly = ko.observable(true);
		self.veranderDatum = function(datum){
			datum(commonFunctions.zetDatumOm(datum()));
		};
		self.veranderDatumTijd = function(datum){
			datum(commonFunctions.zetDatumTijdOm(datum()));
		};
		self.bedrag = function(bedrag){
			log.debug("opmaken bedrag " + bedrag());
			return opmaak.maakBedragOp(bedrag());
		};
	    self.id = ko.observable(data.id);
		self.soortEntiteit = ko.observable('Schade');
	    self.relatie = ko.observable(relatieId);
	    self.bedrijf = ko.observable(data.bedrijf);
	    self.polis = ko.observable(data.polis).extend({validation: {
	        validator: function (val) {
	        	if(ko.utils.unwrapObservable(self.polis) == "Kies een polis uit de lijst.."){
					if(self.schadeNummerMaatschappij.isValid()){
	        			return false;
	        		}else{
	        			return true;
	        		}
	    		}else{
	    			return true;
	    		}
	        },
	        message: 'Dit veld is verplicht.'
	    }});
	    self.schadeNummerMaatschappij = ko.observable(data.schadeNummerMaatschappij).extend({required: true});
	    self.schadeNummerTussenPersoon = ko.observable(data.schadeNummerTussenPersoon);
	    self.soortSchade = ko.observable(data.soortSchade).extend({required: true});
	    self.locatie = ko.observable(data.locatie);
	    self.statusSchade = ko.observable(data.statusSchade).extend({validation: {
	        validator: function (val) {
	        	if(ko.utils.unwrapObservable(self.statusSchade) == "Kies een status uit de lijst.."){
					if(self.schadeNummerMaatschappij.isValid()){
	        			return false;
	        		}else{
	        			return true;
	        		}
	    		}else{
	    			return true;
	    		}
	        },
	        message: 'Dit veld is verplicht.'
	    }});
	    self.datumTijdSchade = ko.observable(data.datumTijdSchade).extend({required: true, validation: {
	        validator: function (val) {
	        	if(moment(val, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm") == "Invalid date"){
	    			return false;
	    		}else{
	    			return true;
	    		}
	        },
	        message: 'Juiste invoerformaat is : dd-mm-eejj uu:mm'
	    }});
	    self.datumTijdMelding = ko.observable(data.datumTijdMelding).extend({required: true, validation: {
	        validator: function (val) {
	        	if(moment(val, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm") == "Invalid date"){
	    			return false;
	    		}else{
	    			return true;
	    		}
	        },
	        message: 'Juiste invoerformaat is : dd-mm-eejj uu:mm'
	    }});
	    self.datumAfgehandeld = ko.observable(data.datumAfgehandeld).extend({validation: {
	        validator: function (val) {
	        	if(val != undefined && val != ""){
		        	if(moment(val, "DD-MM-YYYY").format("DD-MM-YYYY") == "Invalid date"){
		    			return false;
		    		}else{
		    			return true;
		    		}
	        	}else{
	        		return true;
	        	}
	        },
	        message: 'Juiste invoerformaat is : dd-mm-eejj'
	    }});;
	    self.eigenRisico = ko.observable(data.eigenRisico).extend({number: true});
	    self.omschrijving = ko.observable(data.omschrijving);

	    self.titel = ko.computed(function() {
	    	return data.soortSchade + " (" + data.schadeNummerMaatschappij + ")";
	    }, this);

		self.idDiv = ko.computed(function() {
	        return "collapsableSchade" + data.id;
		}, this);
		self.idDivLink = ko.computed(function() {
	        return "#collapsableSchade" + data.id;
		}, this);

	    this.opmerkingen = ko.observableArray();
			if(data.opmerkingen != null){
			$.each(data.opmerkingen, function(i, item){
				self.opmerkingen.push(new Opmerking(item));
			});
		}

		self.bijlages = ko.observableArray();
		if(data.bijlages != null){
			$.each(data.bijlages, function(i, item){
				self.bijlages.push(new Bijlage(item));
			});
		}

		self.groepBijlages = ko.observableArray();
		if(data.groepBijlages != null){
			$.each(data.groepBijlages, function(i, item){
				var groepBijlages = new GroepBijlages(item);
				self.groepBijlages().push(groepBijlages);
			});
		};

		self.nieuwePolisUpload = function (){
			log.debug("Nieuwe bijlage upload");
			$('uploadprogress').show();

            fileUpload.uploaden().done(function(uploadResultaat){
                log.debug(ko.toJSON(uploadResultaat));

                if(uploadResultaat.bestandsNaam == null) {
                    self.groepBijlages().push(uploadResultaat);
                    self.groepBijlages.valueHasMutated();
                } else {
                    self.bijlages().push(uploadResultaat);
                    self.bijlages.valueHasMutated();
                }
            });
		};

		self.opslaan = function(schade){
	    	var result = ko.validation.group(schade, {deep: true});
	    	if(!schade.isValid()){
	    		result.showAllMessages(true);
	    	}else{
				schade.opmerkingenModel = new opmerkingenModel(data.opmerkingen, null, null, data.id, null);
				schade.bijlages = ko.observableArray();
	    		log.debug("Versturen : " + ko.toJSON(schade));

	    		dataServices.opslaanSchade(ko.toJSON(schade)).done(function(){
					commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
					if(schade.relatie() != undefined){
						redirect.redirect('BEHEREN_RELATIE', schade.relatie(), 'schades');
					} else {
						redirect.redirect('BEHEREN_BEDRIJF', schade.bedrijf(), 'schades');
					}
	    		}).fail(function(data){
					commonFunctions.plaatsFoutmelding(data);
	    		});
	    	}
		};

	    self.verwijderBijlage = function(bijlage){
			commonFunctions.verbergMeldingen();
			var r=confirm("Weet je zeker dat je deze bijlage wilt verwijderen?");
			if (r === true) {
				self.bijlages.remove(bijlage);
				dataServices.verwijderBijlage(bijlage.id());
			}
		};

	    self.bewerkSchade = function(schade){
			redirect.redirect('BEHEREN_RELATIE', schade.relatie(), 'schade', schade.id());
	    };

	    self.bewerkSchadeBedrijf = function(schade){
			redirect.redirect('BEHEREN_BEDRIJF', schade.bedrijf(), 'schade', schade.id());
	    };

	    self.plaatsOpmerking = function(schade){
			redirect.redirect('BEHEREN_RELATIE', schade.relatie(), 'opmerking', 's' + schade.id());
	    };

		self.annuleren = function(){
			redirect.redirect('BEHEREN_RELATIE', self.relatie(), 'schades');
		}

	};
});