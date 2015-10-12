define([ "commons/3rdparty/log",
         "commons/validation",
         "commons/opmaak",
         'commons/commonFunctions',
         "knockout",
         'commons/block',
         'model/relatie',
         'js/model/taak/afhandelenTaak',
         'dataservices',
         'redirect'],
	function(logger, validation, opmaak, commonFunctions, ko, block, Relatie, AfhandelenTaak, dataservices, redirect) {

	return function taakAanvullenAdresAfhandelen(data) {
		_thisTaak = this;

		_thisTaak.relatie = ko.observable('');
		_thisTaak.bsn = ko.observable(data.bsn);

		dataservices.leesRelatie(data.gerelateerdAan).done(function(data){
			_thisTaak.relatie(data);
			_thisTaak.bsn(data.bsn);
		});

		_thisTaak.taakId = ko.observable(data.id);

		_thisTaak.verwijderFoutMelding = function(){
			commonFunctions.verbergMeldingen();
		};

		_thisTaak.opslaan = function(){
			block.block();

			_thisTaak.relatie().bsn = _thisTaak.bsn();
			
			logger.debug(ko.toJSON(_thisTaak.relatie()));
			dataservices.opslaanRelatie(ko.toJSON(_thisTaak.relatie())).done(function(response){
				var afhandelenTaak = new AfhandelenTaak(_thisTaak.taakId());

				logger.debug(ko.toJSON(afhandelenTaak));

				dataservices.afhandelenTaak(ko.toJSON(afhandelenTaak)).done(function(response){
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