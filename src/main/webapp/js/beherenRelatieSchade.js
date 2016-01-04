define(['jquery',
        "knockout",
        'model/schade',
        'commons/block',
        'commons/3rdparty/log',
        'commons/commonFunctions',
         'dataServices',
        'fileUpload',
        'opmerkingenLoader'],
    function($, ko, Schade, block, log, commonFunctions, dataServices, fileUpload, opmerkingenLoader) {

    return function(polisId, relatieId) {
		block.block();
		dataServices.lijstPolissen(relatieId).done(function(data) {
			var $select = $('#polisVoorSchademelding');
			$.each(data, function(key, value) {
				var polisTitel = value.soort + " (" + value.polisNummer + ")";

			    $('<option>', { value : value.id }).text(polisTitel).appendTo($select);
			});

            dataServices.lijstStatusSchade().done(function(data) {
				var $select = $('#statusSchade');
				$.each(data, function(key, value) {
				    $('<option>', { value : value }).text(value).appendTo($select);
				});
				if(subId != null && subId != "0"){
					log.debug("ophalen Schade met id " + subId);

					dataServices.leesSchade(subId).done(function(data) {
						log.debug("applybindings met " + JSON.stringify(data));
						var schade = new Schade(data);
						schade.relatie(relatieId);
                        fileUpload.init().done(function(){
							new opmerkingenLoader(relatieId).init().done(function(){
	                            ko.applyBindings(schade);
							});
                        });
				    });
				}else{
					log.debug("applybindings met een nieuw Schade object");
					var schade = new Schade('');
					schade.relatie(relatieId);
                    fileUpload.init().done(function(){
						new opmerkingenLoader(relatieId).init().done(function(){
	    					ko.applyBindings(schade);
						});
                    });
				}
			});
		});

//			var soortenSchade = new Bloodhound({
//				datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
//				queryTokenizer: Bloodhound.tokenizers.whitespace,
//				remote: '../dejonge/rest/medewerker/overig/soortenSchade?query=%QUERY'
//			});
//
//			soortenSchade.initialize();
//
//			$('#soortSchade').typeahead({
//				hint: true,
//				highlight: true,
//				minLength: 1
//			},
//			{
//				name: 'states',
//				displayKey: 'value',
//				source: soortenSchade.ttAdapter()
//			});
	};
});