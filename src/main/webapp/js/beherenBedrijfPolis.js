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

    return function(polisId, bedrijfsId, readOnly) {
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

			if(subId != null && subId !== "0"){
				$('#soortVerzekering').prop('disabled', true);
				$('#soortVerzekeringAlles').prop('disabled', true);
				log.debug("Ophalen Polis met id : " + polisId);

				dataServices.leesPolis(polisId).done(function(data){
					log.debug(JSON.stringify(data));
					var polis = new Polis(data, readOnly);
					polis.bedrijfsId(bedrijfsId);
					fileUpload.init().done(function(){
						new opmerkingenLoader(bedrijfsId).init().done(function(){
							ko.applyBindings(polis);
        			        $.unblockUI();
						});
					});
			    });
			}else{
				var polis = new Polis('', readOnly);
				polis.bedrijfsId(bedrijfsId);
				fileUpload.init().done(function(){
					new opmerkingenLoader(bedrijfsId).init().done(function(){
						ko.applyBindings(polis);
		                $.unblockUI();
					});
				});
			}
		});
	};
});