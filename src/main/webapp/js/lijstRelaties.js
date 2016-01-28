define(['jquery',
        "knockout",
        'model/lijstRelaties',
        'model/relatie',
        'commons/commonFunctions',
        'commons/block',
        'commons/3rdparty/log',
        'dataServices',
		'redirect'],
    function($, ko, LijstRelaties, Relatie, functions, block, log, dataServices, redirect) {

    return function(zoekTerm){
		var lijst = new LijstRelaties();

		$('#content').load('templates/lijstRelaties.html', function(response, status, xhr) {
			$('#zoekTerm').val(zoekTerm);
			if (status == "success") {
				log.debug("ophalen lijst met Relaties");
				block.block();

				dataServices.lijstRelaties(zoekTerm).done(function(data) {
					log.debug("opgehaald " + JSON.stringify(data));
					if(data != undefined){
						$.each(data.jsonRelaties, function(i, item) {
							var a = item;
							lijst().lijst().push(a);
						});

						log.debug("Relaties opgehaald, applyBindings");
						ko.applyBindings(lijst);
                        $.unblockUI();
					}
				});
			}
		
            $('#zoeken').click(function(){
				redirect.redirect('LIJST_RELATIES', $('#zoekTerm').val());
			});

			$('#zoekTerm').on("keypress", function(e) {
	            if (e.keyCode == 13) {
					redirect.redirect('LIJST_RELATIES', $('#zoekTerm').val());
	            }
			});
		});
	};
});