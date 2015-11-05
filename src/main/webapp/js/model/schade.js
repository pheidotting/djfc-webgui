define(['jquery',
         'knockout',
         'commons/3rdparty/log',
         'commons/commonFunctions',
         'moment',
         'model/bijlage',
         'model/opmerking',
         "commons/opmaak",
         'dataServices',
         'redirect',
         'fileUpload',
         'opmerkingenModel'],
	function ($, ko, log, commonFunctions, moment, Bijlage, Opmerking, opmaak, dataServices, redirect, fileUpload, opmerkingenModel) {

	return function schadeModel (data){
		self = this;

		self.opmerkingenModel = new opmerkingenModel(data.opmerkingen, data.id, null, null, null);

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
	    self.relatie = ko.observable(data.relatie);
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

        self.nieuwePolisUpload = function (){
            log.debug("Nieuwe bijlage upload");
            $('uploadprogress').show();

            if(self.id() == null){
        		dataServices.opslaanSchade(ko.toJSON(self)).done(function(data){
	    			self.id(data.foutmelding);
                    self.id.valueHasMutated();

                    fileUpload.uploaden().done(function(bijlage){
                        console.log(ko.toJSON(bijlage));
                        self.bijlages().push(bijlage);
                        self.bijlages.valueHasMutated();
                        redirect.redirect('BEHEREN_RELATIE', self.relatie(), 'schade', self.id());
                    });
	    		});
            } else {
                fileUpload.uploaden().done(function(bijlage){
                    console.log(ko.toJSON(bijlage));
                    self.bijlages().push(bijlage);
                    self.bijlages.valueHasMutated();
                });
            }
        };

		self.opslaan = function(schade){
	    	var result = ko.validation.group(schade, {deep: true});
	    	if(!schade.isValid()){
	    		result.showAllMessages(true);
	    	}else{
	    		log.debug("Versturen : " + ko.toJSON(schade));

	    		dataServices.opslaanSchade(ko.toJSON(schade)).done(function(){
					commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
					redirect.redirect('BEHEREN_RELATIE', schade.relatie(), 'schades');
	    		}).fail(function(data){
					commonFunctions.plaatsFoutmelding(data);
	    		});
	    	}
		};

	    self.bewerkSchade = function(schade){
			redirect.redirect('BEHEREN_RELATIE', schade.relatie(), 'schade', schade.id());
	    };

	    self.plaatsOpmerking = function(schade){
			redirect.redirect('BEHEREN_RELATIE', schade.relatie(), 'opmerking', 's' + schade.id());
	    };

		self.annuleren = function(){
			redirect.redirect('BEHEREN_RELATIE', self.relatie(), 'schades');
		}

	};
});