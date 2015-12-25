define(['jquery',
        "knockout",
        'model/polis',
        'commons/block',
        'commons/3rdparty/log',
        'commons/commonFunctions',
        'dataServices',
        'fileUpload',
        'opmerkingenLoader'],
     function($, ko, Polis, block, log, commonFunctions, dataServices, fileUpload, opmerkingenLoader) {

	return function(polisId, relatieId, readOnly) {
		block.block();
		log.debug("Ophalen lijst met verzekeringsmaatschappijen");

		dataServices.lijstVerzekeringsmaatschappijen().done(function(data){
			var $select = $('#verzekeringsMaatschappijen');
			$.each(data, function(key, value) {
			    $('<option>', { value : key }).text(value).appendTo($select);
			});
		});

		dataServices.lijstZakelijkePolissen().done(function(data){
			var $select = $('#soortVerzekering');
			$.each(data, function(key, value) {
			    $('<option>', { value : value }).text(value).appendTo($select);
			});
		});

		dataServices.lijstBedrijven(relatieId).done(function(data){
			if(data.length > 0){
				$.getScript("js/model/bedrijven.js", function(dataX, textStatus, jqxhr) {
					var $select = $('#bedrijfBijPolis');
				    $('<option>', { value : '0' }).text('Kies (evt.) een Bedrijf uit de lijst').appendTo($select);
					$.each(data, function(key, value) {
					    $('<option>', { value : key }).text(value.naam).appendTo($select);
					});
				});
			}else{
				$('#bedrijfBijPolisDiv').hide();
			}

			if(subId != null && subId !== "0"){
				$('#soortVerzekering').prop('disabled', true);
				$('#soortVerzekeringAlles').prop('disabled', true);
				log.debug("Ophalen Polis met id : " + polisId);

				dataServices.leesPolis(polisId).done(function(data){
					log.debug(JSON.stringify(data));
					var polis = new Polis(data, readOnly);
					polis.relatie(relatieId);
					fileUpload.init().done(function(){
						new opmerkingenLoader(relatieId).init().done(function(){
							ko.applyBindings(polis);
        			        $.unblockUI();
						});
					});
			    });
			}else{
				var polis = new Polis('', readOnly);
				polis.relatie(relatieId);
				fileUpload.init().done(function(){
					new opmerkingenLoader(relatieId).init().done(function(){
						ko.applyBindings(polis);
		                $.unblockUI();
					});
				});
			}
		});
	};
});