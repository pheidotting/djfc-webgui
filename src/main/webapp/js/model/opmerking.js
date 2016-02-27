define(['jquery',
         'knockout',
         'commons/3rdparty/log',
         'commons/commonFunctions',
         'redirect',
         'dataServices'],
	function ($, ko, log, commonFunctions, redirect, dataServices) {

	return function(data){
		var _this = this;

		_this.id = ko.observable(data.id);
        _this.bovenLiggendId = ko.observable();
		_this.opmerking = ko.observable(data.opmerking);
		_this.tijd = ko.observable(data.tijd);
		_this.medewerker = ko.observable(data.medewerker);
		_this.medewerkerId = ko.observable(data.medewerkerId);
		_this.soort = ko.observable(data.soort);
		_this.entiteitId = ko.observable(data.entiteitId);

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