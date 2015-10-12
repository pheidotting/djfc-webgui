define(['jquery',
		'redirect'],
    function($, redirect) {

	return function(){
		$('#content').load('templates/dashboard/dashboard.html', function(response, status, xhr) {
			if (status == "success") {
				$.get( "../dejonge/rest/medewerker/taak/aantalOpenTaken", function(data) {
					$('#aantalOpenstaandeTaken').html(data);
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