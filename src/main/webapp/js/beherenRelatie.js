define(['jquery',
        'js/beherenRelatieMain',
        'js/beherenRelatieBedrijven',
        'js/beherenRelatieBedrijf',
        'js/beherenRelatiePolissen',
        'js/beherenRelatiePolis',
        'js/beherenRelatieSchades',
        'js/beherenRelatieSchade',
        'js/beherenRelatieHypotheken',
        'js/beherenRelatieHypotheek',
        'js/beherenRelatieBijlages',
        'js/beherenRelatieAangifte',
        'js/beherenRelatieAangiftes',
        'commons/3rdparty/log',
        'commons/commonFunctions',
        'redirect'],
    function($, beherenRelatie, beherenRelatieBedrijven, beherenRelatieBedrijf, beherenRelatiePolissen, beherenRelatiePolis, beherenRelatieSchades, beherenRelatieSchade, beherenRelatieHypotheken, beherenRelatieHypotheek, beherenRelatieBijlages, beherenRelatieAangifte, beherenRelatieAangiftes, log, commonFunctions, redirect) {

    return function(relatieId, actie, subId){
		$('#content').load('templates/beherenRelatieTemplate.html', function(response, status, xhr) {
			if(relatieId == undefined || relatieId == null || relatieId == 0){
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
				$('#details').load("templates/beherenRelatie" + pagina + ".html", function(){
					if(actie == ""){
						new beherenRelatie(relatieId);
					}else if(actie == "bedrijven"){
						new beherenRelatieBedrijven(relatieId);
					}else if(actie == "bedrijf"){
						new beherenRelatieBedrijf(subId, relatieId);
					}else if(actie == "polissen"){
						new beherenRelatiePolissen(relatieId);
					}else if(actie == "polis"){
						new beherenRelatiePolis(subId, relatieId, false);
					}else if(actie == "polisInzien"){
						new beherenRelatiePolis(subId, relatieId, true);
					}else if(actie == "schades"){
						new beherenRelatieSchades(relatieId);
					}else if(actie == "schade"){
						new beherenRelatieSchade(subId, relatieId);
					}else if(actie == "hypotheken"){
						new beherenRelatieHypotheken(relatieId);
					}else if(actie == "hypotheek"){
						new beherenRelatieHypotheek(subId, relatieId);
					}else if(actie == "bijlages"){
						new beherenRelatieBijlages(relatieId);
					}else if(actie == "aangifte"){
						new beherenRelatieAangifte(relatieId);
					}else if(actie == "aangiftes"){
						new beherenRelatieAangiftes(relatieId);
					}
					_relatieId = relatieId;
					_subId = subId;

				});

				if(actie == ""){
					actie = "beherenRelatie";
				}
				$("#" + actie).addClass("navdivactive");
				if(actie == "beherenRelatie"){
					actie = "";
				}

				//Navigatie
				$("#beherenRelatie").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_RELATIE', relatieId);
				});
				$("#bedrijven").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_RELATIE', relatieId, 'bedrijven');
				});
				$("#bedrijf").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_RELATIE', relatieId, 'bedrijf', '0');
				});
				$("#polissen").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_RELATIE', relatieId, 'polissen');
				});
				$("#polis").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_RELATIE', relatieId, 'polis', '0');
				});
				$("#polisInzien").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_RELATIE', relatieId, 'polisInzien', '0');
				});
				$("#schades").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_RELATIE', relatieId, 'schades');
				});
				$("#schade").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_RELATIE', relatieId, 'schade', '0');
				});
				$("#hypotheken").click(function(){
					commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_RELATIE', relatieId, 'hypotheken');
				});
				$("#hypotheek").click(function(){
					commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_RELATIE', relatieId, 'hypotheek', '0');
				});
				$("#bijlages").click(function(){
			    	commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_RELATIE', relatieId, 'bijlages');
				});
				$("#aangiftes").click(function(){
					commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_RELATIE', relatieId, 'aangiftes');
				});
				$("#aangifte").click(function(){
					commonFunctions.verbergMeldingen();
			    	redirect.redirect('BEHEREN_RELATIE', relatieId, 'aangifte', '0');
				});
			}
		});
	};
});