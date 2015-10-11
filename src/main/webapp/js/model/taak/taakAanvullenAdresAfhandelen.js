define([ "commons/3rdparty/log",
         "commons/validation",
         "commons/opmaak",
         'commons/commonFunctions',
         "knockout",
         'commons/block',
         'model/relatie',
         'js/model/taak/afhandelenTaak'],
     function(logger, validation, opmaak, commonFunctions, ko, block, Relatie, AfhandelenTaak) {

	return function taakAanvullenAdresAfhandelen(data) {
		_thisTaak = this;

		_thisTaak.relatie = ko.observable('');
		_thisTaak.straat = ko.observable(data.straat).extend({required: true});
		_thisTaak.huisnummer = ko.observable(data.huisnummer).extend({required: true, number: true});
		_thisTaak.toevoeging = ko.observable(data.toevoeging);
		_thisTaak.postcode = ko.observable(data.postcode).extend({required: true});
		_thisTaak.plaats = ko.observable(data.plaats).extend({required: true});

		dataservices.leesRelatie(data.gerelateerdAan).done(function(data){
			_thisTaak.relatie(data);
			_thisTaak.straat(data.straat);
			_thisTaak.huisnummer(data.huisnummer);
			_thisTaak.toevoeging(data.toevoeging);
			_thisTaak.postcode(data.postcode);
			_thisTaak.plaats(data.plaats);
		});

		_thisTaak.taakId = ko.observable(data.id);
		
		_thisTaak.opzoekenAdres = function(){
			_thisTaak.postcode(_thisTaak.postcode().toUpperCase());
			$.ajax({
				type: "GET",
				url: 'http://api.postcodeapi.nu/' + _thisTaak.postcode() + '/' + _thisTaak.huisnummer(),
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				headers: { 'Api-Key': '0eaff635fe5d9be439582d7501027f34d5a3ca9d'},
		        success: function (data) {
		        	logger.debug(JSON.stringify(data));
		        	_thisTaak.straat(data.resource.street);
		        	_thisTaak.plaats(data.resource.town);
		        },
		        error: function(data) {
		        	logger.debug(JSON.stringify(data));
		        	_thisTaak.straat('');
		        	_thisTaak.plaats('');
		        }
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
			dataservices.opslaanRelatie(ko.toJSON(_thisTaak.relatie())).done(function(response){
				var afhandelenTaak = new AfhandelenTaak(_thisTaak.taakId());

				logger.debug(ko.toJSON(afhandelenTaak));

				dataservices.afhandelenTaak(ko.toJSON(afhandelenTaak)).done(function(response){
					document.location.hash='#taken';
					commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
				}).fail(function(data){
					commonFunctions.plaatsFoutmelding(data);
				});
			}).fail(function(data){
				commonFunctions.plaatsFoutmelding(data);
			});
		};
		
		_thisTaak.terug = function(){
			document.location.hash = "#taken";
		};
	};
});