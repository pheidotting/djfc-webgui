define(['jquery',
        "knockout",
        'model/polis',
        'commons/block',
        'commons/3rdparty/log',
        'commons/commonFunctions',
        'dataservices'],
     function($, ko, Polis, block, log, commonFunctions, dataservices) {

	return function(polisId, relatieId) {
		block.block();
		log.debug("Ophalen lijst met verzekeringsmaatschappijen");

		dataservices.lijstVerzekeringsmaatschappijen().done(function(data){
			var $select = $('#verzekeringsMaatschappijen');
			$.each(data, function(key, value) {
			    $('<option>', { value : value }).text(value).appendTo($select);
			});
		});

		dataservices.lijstBedrijven(relatieId).done(function(data){
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

			if(subId != null && subId != "0"){
				$('#soortVerzekering').prop('disabled', true);
				$('#soortVerzekeringAlles').prop('disabled', true);
				log.debug("Ophalen Polis met id : " + polisId);

				dataservices.leesPolis(polisId).done(function(data){
					log.debug(JSON.stringify(data));
					var polis = new Polis(data);
					polis.relatie(relatieId);
					ko.applyBindings(polis);
			    });
			}else{
				var polis = new Polis('');
				polis.relatie(relatieId);
				ko.applyBindings(polis);
			}
		});
	};
});