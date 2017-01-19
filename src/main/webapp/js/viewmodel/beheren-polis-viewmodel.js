define(['jquery',
        'commons/commonFunctions',
        'knockout',
        'commons/3rdparty/log2',
		'redirect',
        'opmerkingenModel',
        'mapper/polis-mapper',
        'service/polis-service',
        'viewmodel/common/opmerking-viewmodel',
        'viewmodel/common/bijlage-viewmodel',
        'moment',
        'service/toggle-service',
        'viewmodel/common/taak-viewmodel'],
    function($, commonFunctions, ko, log, redirect, opmerkingenModel, polisMapper, polisService, opmerkingViewModel, bijlageViewModel, moment, toggleService, taakViewModel) {

    return function() {
        var _this = this;
        var logger = log.getLogger('beheren-polis-viewmodel');
        var soortEntiteit = 'POLIS';

        this.basisEntiteit = null;
        this.basisId = null;
        this.bijlageModel           = null;
		this.polis                = null;
		this.taakModel              = null;

		this.lijst = ko.observableArray();
		this.id = ko.observable();
        this.readOnly = ko.observable();
        this.notReadOnly = ko.observable();

		this.veranderDatum = function(datum){
			datum(commonFunctions.zetDatumOm(datum()));
		};

        this.init = function(polisId, basisId, readOnly, basisEntiteit) {
            var deferred = $.Deferred();

            _this.readOnly(readOnly);
            _this.notReadOnly(!readOnly);
            _this.basisEntiteit = basisEntiteit;
            _this.basisId = basisId;
            _this.id(polisId);
            $.when(polisService.lees(polisId), polisService.lijstVerzekeringsmaatschappijen(), polisService.lijstParticulierePolissen()).then(function(polis, maatschappijen, lijstParticulierePolissen) {
                _this.polis = polisMapper.mapPolis(polis, maatschappijen);

                _this.opmerkingenModel      = new opmerkingViewModel(false, soortEntiteit, polisId, polis.opmerkingen);
                _this.bijlageModel          = new bijlageViewModel(false, soortEntiteit, polisId, polis.bijlages, polis.groepenBijlages);

                var $verzekeringsMaatschappijenSelect = $('#verzekeringsMaatschappijen');
                $.each(maatschappijen, function(key, value) {
                    $('<option>', { value : key }).text(value).appendTo($verzekeringsMaatschappijenSelect);
                });

                var $soortVerzekeringSelect = $('#soortVerzekering');
                $.each(lijstParticulierePolissen, function(key, value) {
                    $('<option>', { value : value }).text(value).appendTo($soortVerzekeringSelect);
                });

                toggleService.isFeatureBeschikbaar('TODOIST').done(function(toggleBeschikbaar){
                    if(toggleBeschikbaar) {
                        var relatieId;
                        var bedrijfId;
                        if(_this.basisEntiteit == 'RELATIE'){
                            relatieId = _this.basisId;
                        } else {
                            bedrijfId = _this.basisId;
                        }
                        _this.taakModel             = new taakViewModel(false, soortEntiteit, polisId, relatieId, bedrijfId);
                    }
                    return deferred.resolve();
                });
            });

            return deferred.promise();
        };

        zetDatumOm = function(d) {
            var datum = moment(d, 'DDMMYYYY').format('DD-MM-YYYY');

            if(datum == 'Invalid date') {
                return null;
            }

            return datum;
        };

        this.exitProlongatieDatum = function() {
		    _this.polis.prolongatieDatum(zetDatumOm(_this.polis.prolongatieDatum()));
        };

		this.exitIngangsDatum = function() {
		    _this.polis.ingangsDatum(moment(_this.polis.ingangsDatum(), 'DDMMYYYY').format('DD-MM-YYYY'));
            _this.berekenProlongatieDatum();
		}

		this.exitWijzigingsDatum = function() {
		    _this.polis.wijzigingsDatum(zetDatumOm(_this.polis.wijzigingsDatum()));
		};

		this.formatBedrag = function(datum) {
            return opmaak.maakBedragOp(bedrag());
		};

		this.berekenProlongatieDatum = function() {
			if(_this.polis.ingangsDatum() !== null && _this.polis.ingangsDatum() !== undefined && _this.polis.ingangsDatum() !== "") {
				_this.polis.prolongatieDatum(moment(_this.polis.ingangsDatum(), "DD-MM-YYYY").add(1, 'y').format("DD-MM-YYYY"));
			}
		};

		this.opslaan = function() {
		    logger.debug('opslaan');
	    	var result = ko.validation.group(_this.polis, {deep: true});
	    	if(!_this.polis.isValid()) {
	    		result.showAllMessages(true);
	    	}else{
                _this.polis.entiteitId(_this.basisId);
                _this.polis.soortEntiteit(_this.basisEntiteit);
	    		commonFunctions.verbergMeldingen();
	    		polisService.opslaan(_this.polis, _this.opmerkingenModel.opmerkingen).done(function() {
					commonFunctions.plaatsMelding("De gegevens zijn opgeslagen");
                    redirect.redirect('BEHEREN_' + _this.basisEntiteit, _this.basisId, 'polissen');
	    		}).fail(function(data) {
					commonFunctions.plaatsFoutmelding(data);
	    		});
	    	}
		};

        this.annuleren = function() {
			redirect.redirect('BEHEREN_' + _this.basisEntiteit, _this.basisId, 'polissen');
        };
	};
});