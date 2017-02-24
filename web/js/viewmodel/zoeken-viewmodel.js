define(['jquery',
        'commons/commonFunctions',
        'knockout',
        'model/relatie',
        'model/contactpersoon2',
        'commons/commonFunctions',
        'commons/block',
        'commons/3rdparty/log2',
		'redirect',
        'service/toggle-service',
        'service/zoeken-service',
        'mapper/zoekresultaat-mapper'],
    function($, commonFunctions, ko, Relatie, Contactpersoon, functions, block, log, redirect, toggleService, zoekenService, zoekresultaatMapper) {

    return function(id) {
        var _this = this;
        var logger = log.getLogger('zoeken-viewmodel');
        var soortEntiteit = '';

		this.lijst = ko.observableArray();

        this.zoekTerm = ko.observable('Henkie');
        this.zoekResultaat = ko.observableArray([]);

		this.veranderDatum = function(datum){
			datum(commonFunctions.zetDatumOm(datum()));
		};

        this.init = function() {
            var deferred = $.Deferred();

//            window.context.param

            $.when(zoekenService.zoeken()).then(function(zoekResultaat){
                console.log(zoekResultaat);
                $.each(zoekresultaatMapper.mapZoekresultaten(zoekResultaat.bedrijfOfRelatieList)(), function(i, gemapt) {
                    _this.zoekResultaat.push(gemapt);
                    _this.zoekResultaat.valueHasMutated();
                });
//                _this.bedrijf = bedrijfMapper.mapBedrijf(bedrijf);
//
//                _this.telefoonnummersModel  = new telefoonnummerViewModel(false, soortEntiteit, id, bedrijf.telefoonnummers);
//                _this.adressenModel         = new adresViewModel(false, soortEntiteit, id, bedrijf.adressen);
//                _this.opmerkingenModel      = new opmerkingViewModel(false, soortEntiteit, id, bedrijf.opmerkingen);
//                _this.bijlageModel          = new bijlageViewModel(false, soortEntiteit, id, bedrijf.bijlages, bedrijf.groepBijlages);
//
//                _this.contactpersonen = contactpersoonMapper.mapContactpersonen(bedrijf.contactpersonen);
//
//                toggleService.isFeatureBeschikbaar('TODOIST').done(function(toggleBeschikbaar){
//                    if(toggleBeschikbaar && id != 0) {
//                        _this.taakModel             = new taakViewModel(false, soortEntiteit, id, null, id);
//                    }

                    return deferred.resolve();
//                });
            });

            return deferred.promise();
        };

	};
});