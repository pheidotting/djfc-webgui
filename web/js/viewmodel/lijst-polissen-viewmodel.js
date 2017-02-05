define(['jquery',
        'commons/commonFunctions',
        'knockout',
        'commons/commonFunctions',
        'commons/block',
        'commons/3rdparty/log2',
		'redirect',
        'service/polis-service',
        'mapper/polis-mapper',
        'moment',
         'commons/opmaak'],
    function($, commonFunctions, ko, functions, block, log, redirect, polisService, polisMapper, moment, opmaak) {

    return function() {
        var _this = this;
        var logger = log.getLogger('lijst-polissen-viewmodel');
        var soortEntiteit = 'POLIS';

        this.basisEntiteit = null;
        this.id = ko.observable();
        this.polissen = ko.observableArray();

        this.init = function(id, basisEntiteit) {
            var deferred = $.Deferred();

            _this.id(id);
            _this.basisEntiteit = basisEntiteit;

            var relatieId = null;
            var bedrijfId = null;
            if(basisEntiteit == 'RELATIE') {
                relatieId = id;
            } else {
                bedrijfId = id;
            }

            $.when(polisService.lijstPolissen(relatieId, bedrijfId), polisService.lijstVerzekeringsmaatschappijen()).then(function(lijstPolissen, maatschappijen) {
                    _this.polissen = polisMapper.mapPolissen(lijstPolissen, maatschappijen);

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
		
        this.polisInzien = function(polis) {
			commonFunctions.verbergMeldingen();
			logger.debug('Polis inzien met id ' + polis.id() + ' en ' + _this.basisEntiteit + ' id : ' + _this.id());
			redirect.redirect('BEHEREN_' + _this.basisEntiteit, _this.id(), 'polisInzien', polis.id());
	    };

        this.bewerkPolis = function(polis) {
            commonFunctions.verbergMeldingen();
            logger.debug('Polis bewerken met id ' + polis.id() + ' en ' + _this.basisEntiteit + ' id : ' + _this.id());
            redirect.redirect('BEHEREN_' + _this.basisEntiteit, _this.id(), 'polis', polis.id());
        };

        this.beeindigPolis = function(polis) {
	    	polisService.beindigPolis(polis.id());
			polis.eindDatum(moment().format("DD-MM-YYYY"));
	    };

        this.verwijderPolis = function(polis) {
            commonFunctions.verbergMeldingen();
            var r=confirm("Weet je zeker dat je deze polis wilt verwijderen?");
            if (r==true) {
                _this.polissen.remove(polis);
                polisService.verwijderPolis(ko.utils.unwrapObservable(polis.id));
            }
        };
	};
});