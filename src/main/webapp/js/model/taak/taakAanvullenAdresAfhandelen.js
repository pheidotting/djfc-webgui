define([ "commons/3rdparty/log",
         "commons/validation",
         "commons/opmaak",
         'commons/commonFunctions',
         "knockout",
         'commons/block',
         'model/relatie',
         'js/model/taak/afhandelenTaak',
         'commons/3rdparty/log',
         'redirect',
         'dataServices'],
	function(logger, validation, opmaak, commonFunctions, ko, block, Relatie, AfhandelenTaak, log, redirect, dataServices) {

	return function taakAanvullenAdresAfhandelen(data) {
		_thisTaak = this;

		_thisTaak.relatie = ko.observable('');
		_thisTaak.straat = ko.observable(data.straat).extend({required: true});
		_thisTaak.huisnummer = ko.observable(data.huisnummer).extend({required: true, number: true});
		_thisTaak.toevoeging = ko.observable(data.toevoeging);
		_thisTaak.postcode = ko.observable(data.postcode).extend({required: true});
		_thisTaak.plaats = ko.observable(data.plaats).extend({required: true});

		dataServices.leesRelatie(data.gerelateerdAan).done(function(data){
			_thisTaak.relatie(data);
			_thisTaak.straat(data.straat);
			_thisTaak.huisnummer(data.huisnummer);
			_thisTaak.toevoeging(data.toevoeging);
			_thisTaak.postcode(data.postcode);
			_thisTaak.plaats(data.plaats);
		});

		_thisTaak.taakId = ko.observable(data.id);
		
		_thisTaak.opzoekenAdres = function(adres){
            log.debug(ko.toJSON(adres));
            adres.postcode(adres.postcode().toUpperCase().replace(" ", ""));

            dataServices.ophalenAdresOpPostcode(adres.postcode(), adres.huisnummer()).done(function(data){
                log.debug(JSON.stringify(data));
                if(data.resource!=undefined) {
                    adres.straat(data.resource.street);
                    adres.plaats(data.resource.town);
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
		
		_thisTaak.opslaan = function(){
			block.block();

			_thisTaak.relatie().straat = _thisTaak.straat();
			_thisTaak.relatie().huisnummer = _thisTaak.huisnummer();
			_thisTaak.relatie().toevoeging = _thisTaak.toevoeging();
			_thisTaak.relatie().postcode = _thisTaak.postcode();
			_thisTaak.relatie().plaats = _thisTaak.plaats();
			
			logger.debug(ko.toJSON(_thisTaak.relatie()));
			dataServices.opslaanRelatie(ko.toJSON(_thisTaak.relatie())).done(function(response){
				var afhandelenTaak = new AfhandelenTaak(_thisTaak.taakId());

				logger.debug(ko.toJSON(afhandelenTaak));

				dataServices.afhandelenTaak(ko.toJSON(afhandelenTaak)).done(function(response){
					redirect.redirect('TAKEN');
					commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
				}).fail(function(data){
					commonFunctions.plaatsFoutmelding(data);
				});
			}).fail(function(data){
				commonFunctions.plaatsFoutmelding(data);
			});
		};
		
		_thisTaak.terug = function(){
			redirect.redirect('TAKEN');
		};
	};
});