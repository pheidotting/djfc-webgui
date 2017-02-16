define([
'jquery',
        'knockout',
        'commons/commonFunctions',
        'commons/3rdparty/log2',
		'redirect',
        'service/gebruiker-service',
        'knockout.validation',
        'knockoutValidationLocal'
    ],
    function($, ko, commonFunctions, log, redirect, gebruikerService) {

    return function() {
        var _this = this;
        var logger = log.getLogger('inloggen-viewmodel');
        ko.validation.locale('nl-NL');
        this.identificatie = ko.observable().extend({ required: true });
		this.wachtwoord = ko.observable().extend({ required: true });
		this.onthouden = ko.observable(false);

		this.onjuisteGebruikersnaam = ko.observable(false);
		this.onjuistWachtwoord = ko.observable(false);

		this.inloggen = function() {
            logger.debug('inloggen ?');
            commonFunctions.verbergMeldingen();

            var result = ko.validation.group(_this, {deep: true});
            if(_this.identificatie.isValid() && _this.wachtwoord.isValid()){
                logger.debug('inloggen');
//                block.block();

                $.when(gebruikerService.inloggen(ko.toJSON(this))).then(function(result){
                    if (result == 0) {
                        _this.onjuisteGebruikersnaam(false);
                        _this.onjuistWachtwoord(false);
                        commonFunctions.haalIngelogdeGebruiker();
//                        $.unblockUI();
                        document.location.href = 'dashboard.html';
                    } else if (result == 1) {
                        _this.onjuisteGebruikersnaam('onjuiste-waarde');
                        _this.onjuistWachtwoord(false);
                        commonFunctions.plaatsFoutmeldingString('De ingevoerde gebruikersnaam werd niet gevonden');
                        $.unblockUI();
                    } else {
                        _this.onjuisteGebruikersnaam(false);
                        _this.onjuistWachtwoord('onjuiste-waarde');
                        commonFunctions.plaatsFoutmeldingString('Het ingevoerde wachtwoord is onjuist');
                        $.unblockUI();
                    }
                });
            } else {
                result.showAllMessages(true);
            }
        };

        this.resetfoutmeldingGebruikersnaam = function() {
            _this.onjuisteGebruikersnaam(false);
        };

        this.resetfoutmeldingWachtwoord = function() {
            _this.onjuistWachtwoord(false);
        };
	};
});