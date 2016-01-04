define(['jquery',
        'knockout',
        "commons/3rdparty/log",
         "js/model/hypotheek",
         'dataServices',
        'fileUpload',
        'opmerkingenLoader'],
    function($, ko, logger, hypotheek, dataServices, fileUpload, opmerkingenLoader){

    return function(polisId, relatieId) {
		logger.debug("aanmaken nieuw hypotheek model");

		dataServices.lijstSoortenHypotheek().done(function(data){
			var $select = $('#hypotheekVorm');
		    $('<option>', { value : '' }).text('Kies een soort hypotheek uit de lijst...').appendTo($select);
			$.each(data, function(key, value) {
			    $('<option>', { value : value.id }).text(value.omschrijving).appendTo($select);
			});
			dataServices.lijstHypothekenInclDePakketten(relatieId).done(function(data) {
				if(data.length > 0){
					var $select = $('#koppelHypotheek');
					$('<option>', { value : '' }).text('Kies evt. een hypotheek om mee te koppelen...').appendTo($select);
					$.each(data, function(key, value) {
						var h = new hypotheek(value);
						if(h.id() != subId){
							$('<option>', { value : value.id }).text(h.titel()).appendTo($select);
						}
					});
				}else{
					$('#gekoppeldeHypotheekGroep').hide();
				}
				dataServices.leesHypotheek(subId).done(function(data) {
					logger.debug("Gegevens opgehaald voor hypotheek, applyBindings");
					logger.debug(data);
                    fileUpload.init().done(function(){
						new opmerkingenLoader(relatieId).init().done(function(){
	    					ko.applyBindings(new hypotheek(data));
						});
                    });
				});
			});
		});
	};
});