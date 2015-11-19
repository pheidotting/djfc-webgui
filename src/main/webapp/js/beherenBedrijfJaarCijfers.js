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

	return function(bedrijfsId) {
		block.block();
		log.debug("Ophalen jaarcijfers");

		dataServices.ophalenJaarCijfers(bedrijfsId).done(function(data){
			log.debug("Opgehaald data");
		});

//
//		dataServices.lijstBedrijven(relatieId).done(function(data){
//			if(data.length > 0){
//				$.getScript("js/model/bedrijven.js", function(dataX, textStatus, jqxhr) {
//					var $select = $('#bedrijfBijPolis');
//				    $('<option>', { value : '0' }).text('Kies (evt.) een Bedrijf uit de lijst').appendTo($select);
//					$.each(data, function(key, value) {
//					    $('<option>', { value : key }).text(value.naam).appendTo($select);
//					});
//				});
//			}else{
//				$('#bedrijfBijPolisDiv').hide();
//			}
//
//			if(subId != null && subId != "0"){
//				$('#soortVerzekering').prop('disabled', true);
//				$('#soortVerzekeringAlles').prop('disabled', true);
//				log.debug("Ophalen Polis met id : " + polisId);
//
//				dataServices.leesPolis(polisId).done(function(data){
//					log.debug(JSON.stringify(data));
//					var polis = new Polis(data, readOnly);
//					polis.relatie(relatieId);
//					fileUpload.init().done(function(){
//						new opmerkingenLoader(relatieId).init().done(function(){
//							ko.applyBindings(polis);
//						});
//					});
//			    });
//			}else{
//				var polis = new Polis('', readOnly);
//				polis.relatie(relatieId);
//				fileUpload.init().done(function(){
//					new opmerkingenLoader(relatieId).init().done(function(){
//						ko.applyBindings(polis);
//					});
//				});
//			}
//		});
	};
});