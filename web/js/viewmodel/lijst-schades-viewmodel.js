define(['jquery',
        'commons/commonFunctions',
        'knockout',
        'commons/commonFunctions',
        'commons/block',
        'commons/3rdparty/log2',
		'redirect',
        'service/schade-service',
        'mapper/schade-mapper',
        'moment',
         'commons/opmaak'],
    function($, commonFunctions, ko, functions, block, log, redirect, schadeService, schadeMapper, moment, opmaak) {

    return function() {
        var _this = this;
        var logger = log.getLogger('lijst-schades-viewmodel');
        var soortEntiteit = 'SCHADE';

        this.basisEntiteit = null;
        this.id = ko.observable();
        this.schades = ko.observableArray();

        this.init = function(id, basisEntiteit) {
            var deferred = $.Deferred();

            _this.id(id);
            _this.basisEntiteit = basisEntiteit;
            $.when(schadeService.lijstSchades(id, basisEntiteit), schadeService.lijstStatusSchade()).then(function(lijstSchades, statussenSchade) {
                    _this.schades = schadeMapper.mapSchades(lijstSchades, statussenSchade);

                return deferred.resolve();
            });

            return deferred.promise();
        };

		this.formatDatum = function(datum) {
		    datum(moment(datum(), 'YYYY-MM-DD').format('DD-MM-YYYY'));

		    return datum;
		};

		this.formatBedrag = function(bedrag) {
            return opmaak.maakBedragOp(bedrag());
		};

		this.bewerkSchade = function(schade) {
            redirect.redirect('BEHEREN_' + _this.basisEntiteit, _this.id(), 'schade', schade.id());
        };

		this.verwijderSchade = function(schade) {
            var r=confirm("Weet je zeker dat je deze schade wilt verwijderen?");
            if (r==true) {
                _this.schades.remove(schade);
                schadeService.verwijderSchade(schade.id());
            }
        };
	};
});