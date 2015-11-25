define(['jquery',
         'knockout',
         'commons/3rdparty/log',
         'commons/commonFunctions',
         'redirect',
         'dataServices'],
	function ($, ko, log, commonFunctions, redirect, dataServices) {

	return function opmerkingModel (data){
		_this = this;

		_this.id = ko.observable(data.id);
        _this.bovenLiggendId = ko.observable();
		_this.opmerking = ko.observable(data.opmerking);
		_this.schade = ko.observable(data.schade);
		_this.hypotheek = ko.observable(data.hypotheek);
		_this.polis = ko.observable(data.polis);
		_this.relatie = ko.observable(data.relatie);
		_this.bedrijf = ko.observable(data.bedrijf);
		_this.aangifte = ko.observable(data.aangifte);
		_this.tijd = ko.observable(data.tijd);
		_this.medewerker = ko.observable(data.medewerker);
		_this.medewerkerId = ko.observable(data.medewerkerId);
		_this.jaarcijfers = ko.observable(data.jaarcijfers);
		_this.risicoAnalyse = ko.observable(data.risicoAnalyse);
		_this.soort = ko.computed(function() {
			var soort = "Persoon";
			if(_this.schade() != null){
				soort = "Schade";
			}
			if(_this.hypotheek() != null){
				soort = "Hypotheek";
			}
			if(_this.polis() != null){
				soort = "Polis";
			}
			if(_this.jaarcijfers() != null){
				soort = "JaarCijfers";
			}
			return soort;
		}, this);

        _this.tekstBackup = ko.observable();
		_this.startBewerken = function(opmerking){
		    opmerking.tekstBackup(opmerking.opmerking());
		    $('#edit' + opmerking.id()).show();
		    $('#tekst' + opmerking.id()).hide();
		};

		_this.opslaan = function(opmerking){
		    opmerking.tekstBackup('');
		    $('#edit' + opmerking.id()).hide();
		    $('#tekst' + opmerking.id()).show();

		    log.debug("Opslaan : " + ko.toJSON(opmerking));
            dataServices.opslaanOpmerking(ko.toJSON(opmerking));
		};

		_this.annuleren = function(opmerking){
		    opmerking.opmerking(opmerking.tekstBackup());
		    $('#edit' + opmerking.id()).hide();
		    $('#tekst' + opmerking.id()).show();
		};
    };
});