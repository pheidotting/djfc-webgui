define(['jquery',
        'commons/commonFunctions',
        'knockout',
        'model/relatie',
        'commons/commonFunctions',
        'commons/block',
        'commons/3rdparty/log2',
		'redirect',
		'repository/common/repository',
        'service/gebruiker-service',
		'service/taak/taak-service',
        'service/toggle-service',
		'underscore'],
    function($, commonFunctions, ko, Relatie, functions, block, log, redirect, repository, gebruikerService, taakService, toggleService, _) {

    return function() {
        var _this = this;
        this.aantalOpenstaandeTaken = ko.observable();
        var logger = log.getLogger('dahsboard-viewmodel');
        this.beheerZichtbaar = ko.observable();

        this.init = function() {
            var deferred = $.Deferred();

            $.when(toggleService.isFeatureBeschikbaar('TODOIST'), toggleService.isFeatureBeschikbaar('BEHEERPAGINA')).then(function(toggleBeschikbaar, toggleBeheerBeschikbaar) {
                logger.debug('ophalen aantal open taken');

                _this.beheerZichtbaar(toggleBeheerBeschikbaar);

                if(toggleBeschikbaar) {
                    $.when(taakService.aantalOpenTaken()).then(function(aantal) {
                        _this.aantalOpenstaandeTaken(aantal);
                        _this.aantalOpenstaandeTaken.valueHasMutated();
                    });
                }
            });
                    return deferred.resolve();

            return deferred.promise();
        };

        this.aantalOpenstaandeTakenTonen = ko.computed(function() {
            return parseInt(_this.aantalOpenstaandeTaken()) > 0;
        });

        this.naarParticulier = function() {
            logger.debug('lijst relaties');
            redirect.redirect('LIJST_RELATIES');
        };

        this.naarZakelijk = function() {
            logger.debug('lijst bedrijven');
            redirect.redirect('LIJST_BEDRIJVEN');
        };

        this.naarBeheer = function() {
            logger.debug('naar beheer');
            location.href = 'beheer.html';
        };
	};
});