define(['jquery',
        'js/beherenBedrijfMain',
        'js/beherenBedrijfJaarCijfers',
        'js/beherenBedrijfRisicoAnalyse',
        'commons/3rdparty/log',
        'commons/commonFunctions',
        'redirect'],
    function($, beherenBedrijf, beherenBedrijfJaarCijfers, beherenBedrijfRisicoAnalyse, log, commonFunctions, redirect) {

	return function(bedrijfId, actie, subId){
		$('#content').load('templates/beherenBedrijfTemplate.html', function(response, status, xhr) {
			if(bedrijfId == undefined || bedrijfId == null || bedrijfId == 0){
				$('#bedrijven').hide();
				$('#bedrijf').hide();
				$('#polissen').hide();
				$('#polis').hide();
				$('#schades').hide();
				$('#schade').hide();
				$('#hypotheken').hide();
				$('#hypotheek').hide();
				$('#bijlages').hide();
			}
			if (status == "success") {
				//Op basis van actie de actieve tab bepalen
				var pagina = "";
				if(actie != undefined && actie != null){
					pagina = actie;
				}
				if(actie == undefined || actie == null) {
				    actie = "";
                }

				//Uitzondering
				if(pagina == 'polisInzien') {
					pagina= "polis";
				}

				//Onderliggende pagina aanroepen
				$('#details').load("templates/beherenBedrijf" + pagina + ".html", function(){
					if(actie == ""){
						new beherenBedrijf(bedrijfId);
					}else if(actie == "jaarcijfers"){
						new beherenBedrijfJaarCijfers(bedrijfId);
					}else if(actie = "risicoanalyse"){
					    new beherenBedrijfRisicoAnalyse(bedrijfId);
					}
					_bedrijfId = bedrijfId;
					_subId = subId;

				});

				if(actie == ""){
					actie = "beherenBedrijf";
				}
				$("#" + actie).addClass("navdivactive");
				if(actie == "beherenBedrijf"){
					actie = "";
				}

				//Navigatie
				$("#beherenBedrijf").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_BEDRIJF', bedrijfId);
				});
				$("#polissen").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_BEDRIJF', bedrijfId, 'polissen');
				});
				$("#polis").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_BEDRIJF', bedrijfId, 'polis', '0');
				});
				$("#polisInzien").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_BEDRIJF', bedrijfId, 'polisInzien', '0');
				});
				$("#schades").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_BEDRIJF', bedrijfId, 'schades');
				});
				$("#schade").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_BEDRIJF', bedrijfId, 'schade', '0');
				});
				$("#jaarcijfers").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_BEDRIJF', bedrijfId, 'jaarcijfers');
				});
				$("#risicoanalyes").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_BEDRIJF', bedrijfId, 'risicoanalyes');
				});
			}
		});
	};
});