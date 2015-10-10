define(['jquery',
        'knockout',
        "commons/3rdparty/log",
         "js/model/hypotheek",
         'dataservices'],
	function($, ko, logger, hypotheek, dataservices){

	return function(polisId, relatieId) {
		logger.debug("aanmaken nieuw hypotheek model");

		dataservices.lijstSoortenHypotheek().done(function(data){
			var $select = $('#hypotheekVorm');
		    $('<option>', { value : '' }).text('Kies een soort hypotheek uit de lijst...').appendTo($select);
			$.each(data, function(key, value) {
			    $('<option>', { value : value.id }).text(value.omschrijving).appendTo($select);
			});
			dataservices.lijstHypothekenInclDePakketten(relatieId).done(function(data) {
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
				dataservices.leesHypotheek(subId).done(function(data) {
					logger.debug("Gegevens opgehaald voor hypotheek, applyBindings");
					logger.debug(data);
					ko.applyBindings(new hypotheek(data));
				});
			});
		});
	};
});