define([ "commons/3rdparty/log",
         "commons/validation",
         "commons/opmaak",
         'commons/commonFunctions',
         "knockout",
         'commons/block',
         'model/relatie',
         'js/model/taak/afhandelenTaak',
         'dataservices'],
	function(logger, validation, opmaak, commonFunctions, ko, block, Relatie, AfhandelenTaak, dataservices) {

	return function taakAanvullenAdresAfhandelen(data) {
		_thisTaak = this;

		_thisTaak.relatie = ko.observable('');
		_thisTaak.emailadres = ko.observable(data.emailadres).extend({email: true, required: true});

		dataservices.leesRelatie(data.gerelateerdAan).done(function(data) {
			_thisTaak.relatie(data);
			_thisTaak.emailadres(data.identificatie);
		});

		_thisTaak.taakId = ko.observable(data.id);
		
		_thisTaak.verwijderFoutMelding = function(){
			commonFunctions.verbergMeldingen();
		};
		
		_thisTaak.opslaan = function(){
			block.block();

			_thisTaak.relatie().identificatie = _thisTaak.emailadres();
			
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