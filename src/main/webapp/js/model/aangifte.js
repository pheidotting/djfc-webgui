define(['jquery',
         'knockout',
         'model/bijlage',
         'commons/3rdparty/log',
         'commons/commonFunctions',
         'dataservices',
         'navRegister',
         'redirect'],
	function ($, ko, Bijlage, log, commonFunctions, dataservices, navRegister, redirect) {

	return function aangifteModel (data){
		aangifte = this;

		aangifte.id = ko.observable(data.id);
		aangifte.jaar = ko.observable(data.jaar);
		aangifte.datumAfgerond = ko.observable(data.datumAfgerond);
		aangifte.uitstelTot = ko.observable(data.uitstelTot);
		aangifte.afgerondDoor = ko.observable(data.afgerondDoor);
		aangifte.relatie = ko.observable(data.relatie);
		aangifte.bijlages = ko.observableArray();
		if(data.bijlages != null){
			var bijlages = [];
			$.each(data.bijlages, function(i, item){
				aangifte.bijlages.push(new Bijlage(item));
			});
		}

		aangifte.idDiv = ko.computed(function() {
	        return "collapsable" + data.id;
		}, this);
		aangifte.idDivLink = ko.computed(function() {
	        return "#collapsable" + data.id;
		}, this);

//		aangifte.veranderDatum = function(){
//			log.debug("datum1");
//			log.debug(datum);
//			datum(commonFunctions.zetDatumOm(datum()));
//		}

		aangifte.afronden = function(aangifte){
			dataservices.afrondenAangifte(JSON.stringify(aangifte.id())).done(function(data){
                redirect.redirect('BEHEREN_RELATIE', aangifte.relatie(), 'aangiftes');
			}).fail(function(data){
				commonFunctions.plaatsFoutmelding(data);
			});
	    };
	    
	    aangifte.opslaan = function(aangifte){
			aangifte.bijlages([]);
    		commonFunctions.verbergMeldingen();
    		log.debug("versturen naar " + navRegister.bepaalUrl('OPSLAAN_AANGIFTE'));
    		log.debug(ko.toJSON(aangifte));

    		dataservices.opslaanAangifte(ko.toJSON(aangifte)).done(function(data){
				aangifte.id(data);
				for (var int = 1; int <= $('#hoeveelFiles').val(); int++) {
					var formData = new FormData($('#aangifteForm')[0]);
					log.debug("Versturen naar ../dejonge/rest/medewerker/bijlage/uploadAangifte" + int + 'File')
					log.debug(JSON.stringify(formData));
					uploadBestand(formData, '../dejonge/rest/medewerker/bijlage/uploadAangifte' + int + 'File');
				}
				commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
				log.debug("aangifte id : " + aangifte.relatie());
                redirect.redirect('BEHEREN_RELATIE', aangifte.relatie());
    		}).fail(function(data){
				commonFunctions.plaatsFoutmelding(data);
    		});
		};
    };
});