define(['jquery',
         'knockout',
         'model/bijlage',
         'commons/3rdparty/log',
         'commons/commonFunctions',
         'dataServices',
         'navRegister',
         'redirect',
         'fileUpload',
         'moment'],
	function ($, ko, Bijlage, log, commonFunctions, dataServices, navRegister, redirect, fileUpload, moment) {

	return function communicatieproductModel (data, relatieId){
		_cm = this;

		_cm.id = ko.observable(data.id);
        _cm.type = ko.observable(maakType(data.type));

        function maakType(type) {
            if (type === 'JsonUitgaandeEmail' || type === 'JsonIngaandeEmail') {
                return 'EMAIL';
            } else if (type === 'JsonUitgaandeBrief' || type === 'JsonIngaandeBrief') {
                return 'BRIEF';
            }
            return '';
        }

        _cm.datumTijdCreatie = ko.observable(new moment(data.datumTijdCreatie, 'YYYY-MM-DD HH:mm').format('DD-MM-YYYY HH:mm'));
        _cm.datumTijdVerzending = data.datumTijdVerzending !== null ? ko.observable(new moment(data.datumTijdVerzending, 'YYYY-MM-DD HH:mm').format('DD-MM-YYYY HH:mm')) : ko.observable('');
        _cm.soortEntiteit = ko.observable(data.soortEntiteit);
        _cm.entiteitId = ko.observable(data.entiteitId);
        if(relatieId !== undefined) {
            _cm.soortEntiteit('RELATIE');
            _cm.entiteitId(relatieId);
        }
        _cm.tekst = ko.observable(data.tekst);
        _cm.antwoordOp = ko.observable(data.antwoordOp);
        _cm.onderwerp = ko.observable(data.onderwerp);
        _cm.ongelezenIndicatie = ko.observable(data.ongelezenIndicatie);
        _cm.bijlages = ko.observableArray();
		_cm.idDiv = ko.computed(function() {
	        return "collapsable" + data.id;
		}, this);
		_cm.idDivLink = ko.computed(function() {
	        return "#collapsable" + data.id;
		}, this);
		_cm.klasse = ko.observable();
        if(data.ongelezenIndicatie) {
            _cm.klasse('ongelezenMail');
        }

		if(data.bijlages != null){
			$.each(data.bijlages, function(i, item){
				var bijlage = new Bijlage(item);
				_cm.bijlages().push(bijlage);
			});
		};
		if(data.tekst === undefined || data.tekst === '') {
		    //default tekst maken

            dataServices.leesRelatie(relatieId).done(function(relatie){
                dataServices.haalIngelogdeGebruiker().done(function(ingelogdeGebruiker){
                    var aanhef = 'heer/mevrouw';
                    if (relatie.geslacht === 'Man') {
                        aanhef = 'heer';
                    } else if (relatie.geslacht === 'Vrouw') {
                        aanhef = 'mevrouw';
                    }

        		    _cm.tekst('Geachte ' + aanhef + ' ' + relatie.achternaam + ',\n\n\n\nMet vriendelijke groet,\n\n' + ingelogdeGebruiker.gebruikersnaam + '\n' + ingelogdeGebruiker.kantoor);
                });
            });
		}

		if(sessionStorage.getItem('antwoordOp') !== null && sessionStorage.getItem('antwoordOp') !== 'null'){
            dataServices.leesCommunicatieProduct(sessionStorage.getItem('antwoordOp')).done(function(origin){
                _cm.type(maakType(origin.type));
                _cm.antwoordOp(origin.id);
                _cm.onderwerp('RE: ' + origin.onderwerp);
            });
            sessionStorage.setItem('antwoordOp', null)
		}

		_cm.opslaan = function(cm) {
		    opslaanCm(cm).done(function(){
                redirect.redirect('BEHEREN_RELATIE', cm.entiteitId(), 'communicaties');
		    });
		};

		_cm.verzenden = function(cm) {
		    opslaanCm(cm).done(function(){
                dataServices.verzendenCommunciatieProduct(cm.id()).done(function(){
                    redirect.redirect('BEHEREN_RELATIE', cm.entiteitId(), 'communicaties');
                });
		    });
		};

		opslaanCm = function(cm){
            var deferred = $.Deferred();

		    console.log('Opslaan ' + ko.toJSON(cm));
		    dataServices.opslaanCommunciatieProduct(cm).done(function(id){
		        cm.id(id);
                return deferred.resolve(id);
           });

            return deferred.promise();
		};

        _cm.nieuwePolisUpload = function (){
            log.debug("Nieuwe bijlage upload");
            $('uploadprogress').show();

            if(_cm.id() == null){
        		dataServices.opslaanAangifte(ko.toJSON(_cm)).done(function(data){
	    			_cm.id(data);
                    _cm.id.valueHasMutated();

                    fileUpload.uploaden().done(function(bijlage){
                        console.log(ko.toJSON(bijlage));
                        _cm.bijlages().push(bijlage);
                        _cm.bijlages.valueHasMutated();
                    });
	    		});
            } else {
                fileUpload.uploaden().done(function(bijlage){
                    console.log(ko.toJSON(bijlage));
                    _cm.bijlages().push(bijlage);
                    _cm.bijlages.valueHasMutated();
                });
            }
        };

        _cm.beantwoordenKnopTonen = ko.observable();
        _cm.bewerkenKnopTonen = ko.observable();


//	    _cm.opslaan = function(aangifte){
//			aangifte.bijlages([]);
//    		commonFunctions.verbergMeldingen();
//    		log.debug("versturen naar " + navRegister.bepaalUrl('OPSLAAN_cm'));
//    		log.debug(ko.toJSON(aangifte));
//
//    		dataServices.opslaanAangifte(ko.toJSON(aangifte)).done(function(data){
//				aangifte.id(data);
//				commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
//				log.debug("aangifte id : " + aangifte.relatie());
//                redirect.redirect('BEHEREN_RELATIE', aangifte.relatie());
//    		}).fail(function(data){
//				commonFunctions.plaatsFoutmelding(data);
//    		});
//		};

		_cm.annuleren = function(){
			redirect.redirect('BEHEREN_RELATIE', _cm.relatie(), 'communicatieproducten');
		}
    };
});