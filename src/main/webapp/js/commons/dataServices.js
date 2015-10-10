define(["commons/3rdparty/log",
        "navRegister"],
    function(log, navRegister) {

        return {
            inloggen: function(data){
                var deferred = $.Deferred();

                $.ajax({
                    type: "POST",
                    url: navRegister.bepaalUrl('INLOGGEN'),
                    contentType: "application/json",
                    data: data,
                    success: function (response) {
                        return deferred.resolve();
                    },
                    error: function (data) {
                        return deferred.reject(data);
                    }
                });

                return deferred.promise();
            },

            haalIngelogdeGebruiker: function(){
                var deferred = $.Deferred();

                $.ajax({
                    url: navRegister.bepaalUrl('INGELOGDE_GEBRUIKER'),
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    success: function (response) {
                        return deferred.resolve(response);
                    },
                    error: function (data) {
                        return deferred.reject();
                    }
	            });

                return deferred.promise();
	        },

            uitloggen: function(){
                $.ajax({
                    url: navRegister.bepaalUrl('UITLOGGEN'),
                    type: 'GET'
                })
            },

            lijstRelaties: function(zoekTerm){
                var deferred = $.Deferred();

                $.get(navRegister.bepaalUrl('LIJST_RELATIES'), {"zoekTerm" : zoekTerm}, function(response) {
                    return deferred.resolve(response);
                });

                return deferred.promise();
            },

            leesRelatie: function(id){
                var deferred = $.Deferred();

                $.ajax({
                    type: "GET",
                    url: navRegister.bepaalUrl('LEES_RELATIE'),
                    async: false,
                    dataType: "json",
                    data: {
                        id : id
                    },
                    context: this,
                    success: function(response) {
                        return deferred.resolve(response);
                    },
                    error: function (response) {
                        return deferred.reject(response);
                    }
                });

                return deferred.promise();
            },

            opslaanRelatie: function(data){
                var deferred = $.Deferred();

				$.ajax({
					url: navRegister.bepaalUrl('OPSLAAN_RELATIE'),
					type: 'POST',
					data: data,
					contentType: 'application/json; charset=utf-8',
                    success: function(response) {
                        return deferred.resolve(response);
                    },
                    error: function (response) {
                        return deferred.reject(response);
                    }
				});

                return deferred.promise();
            },

            verwijderRelatie: function(id){
                $.ajax({
                    type: "GET",
                    url: navRegister.bepaalUrl('VERWIJDER_RELATIE'),
                    dataType:'json',
                    data: {
                        id : id
                    }
                });
            },

            lijstBedrijven: function(relatieId){
                var deferred = $.Deferred();

                $.ajax({
                    type: "GET",
                    url: navRegister.bepaalUrl('LIJST_BEDRIJVEN_BIJ_RELATIE'),
                    async: false,
                    dataType: "json",
                    data: {
                        relatieId : relatieId
                    },
                    context: this,
                    success: function(response) {
                        return deferred.resolve(response);
                    },
                    error: function (response) {
                        return deferred.reject(response);
                    }
                });

                return deferred.promise();
            },

            opslaanBedrijf: function(data){
                var deferred = $.Deferred();

				$.ajax({
					type: "POST",
					url: navRegister.bepaalUrl('OPSLAAN_BEDRIJF'),
					contentType: "application/json",
			        data: data,
                    success: function(response) {
                        return deferred.resolve(response);
                    },
                    error: function (response) {
                        return deferred.reject(response);
                    }
				});

                return deferred.promise();
            },

            leesBedrijf: function(id){
                var deferred = $.Deferred();

                $.get(navRegister.bepaalUrl('LEES_BEDRIJF'), {"id" : id}, function(response) {
                    return deferred.resolve(response);
                });

                return deferred.promise();
            },

            lijstVerzekeringsmaatschappijen: function(){
                var deferred = $.Deferred();

                $.get(navRegister.bepaalUrl('LIJST_VERZEKERINGSMAATSCHAPPIJEN'), {}, function(response) {
                    return deferred.resolve(response);
                });

                return deferred.promise();
            },

            leesPolis: function(polisId){
                var deferred = $.Deferred();

				$.get(navRegister.bepaalUrl('LEES_POLIS'), {"id" : polisId}, function(response) {
                    return deferred.resolve(response);
				});

                return deferred.promise();
            },

            lijstPolissen: function(relatieId){
                var deferred = $.Deferred();

                $.ajax({
                    type: "GET",
                    url: navRegister.bepaalUrl('LIJST_POLISSEN'),
                    async: false,
                    dataType: "json",
                    data: {
                        relatieId : relatieId
                    },
                    context: this,
                    success: function(response) {
                        return deferred.resolve(response);
                    }
                });

                return deferred.promise();
            },

            verwijderBijlage: function(id){
				$.get(navRegister.bepaalUrl('VERWIJDER_BIJLAGE'), {"id" : id}, function() {});
            },

            beindigPolis: function(id){
				$.get(navRegister.bepaalUrl('BEEINDIG_POLIS'), {"id" : id}, function() {});
            },

            opslaanPolis: function(data){
                var deferred = $.Deferred();

				$.ajax({
					type: "POST",
					url: navRegister.bepaalUrl('OPSLAAN_POLIS'),
					contentType: "application/json",
		            data: data,
                    success: function(response) {
                        return deferred.resolve(response);
                    },
                    error: function (response) {
                        return deferred.reject(response);
                    }
		    	});

                return deferred.promise();
            },

            verwijderPolis: function(id){
				$.get(navRegister.bepaalUrl('VERWIJDER_POLIS'), {"id" : id}, function() {});
            },

            opslaanSchade: function(data){
                var deferred = $.Deferred();

		    	$.ajax({
		            url: navRegister.bepaalUrl('OPSLAAN_SCHADE'),
		            type: 'POST',
		            data: data ,
		            contentType: 'application/json; charset=utf-8',
                    success: function(response) {
                        return deferred.resolve(response);
                    },
                    error: function (response) {
                        return deferred.reject(response);
                    }
		        });

                return deferred.promise();
            },

            verwijderSchade: function(id){
				$.get(navRegister.bepaalUrl('VERWIJDER_SCHADE'), {"id" : id}, function() {});
            },

            lijstStatusSchade: function(){
                var deferred = $.Deferred();

                $.get(navRegister.bepaalUrl('LIJST_STATUS_SCHADE'), {"id" : id}, function(response) {
                    return deferred.resolve(response);
                });

                return deferred.promise();
            },

            leesSchade: function(id){
                var deferred = $.Deferred();

                $.get( "../dejonge/rest/medewerker/schade/lees", {"id" : subId}, function(response) {
                    return deferred.resolve(response);
                });

                return deferred.promise();
            },

            lijstSchades: function(relatieId){
                var deferred = $.Deferred();

                $.ajax({
                    type: "GET",
                    url: navRegister.bepaalUrl('LIJST_SCHADES'),
                    async: false,
                    dataType: "json",
                    data: {
                        relatieId : relatieId
                    },
                    context: this,
                    success: function(response) {
                        return deferred.resolve(response);
                    },
                    error: function (response) {
                        return deferred.reject(response);
                    }
                });

                return deferred.promise();
            },

            lijstSoortenHypotheek: function(id){
                var deferred = $.Deferred();

                $.get(navRegister.bepaalUrl('LIJST_SOORTEN_HYPOTHEEK'), {"id" : id}, function(response) {
                    return deferred.resolve(response);
                });

                return deferred.promise();
            },

            lijstHypothekenInclDePakketten: function(relatieId){
                var deferred = $.Deferred();

    			$.get(navRegister.bepaalUrl('LIJST_HYPOTHEKEN_INCL_PAKKETTEN'), {relatieId : relatieId}, function(response) {
                    return deferred.resolve(response);
                });

                return deferred.promise();
            },

            leesHypotheek: function(id){
                var deferred = $.Deferred();

    			$.get(navRegister.bepaalUrl('LEES_HYPOTHEEK'), {id : id}, function(response) {
                    return deferred.resolve(response);
                });

                return deferred.promise();
            },

            lijstHypotheken: function(relatieId){
                var deferred = $.Deferred();

    			$.get(navRegister.bepaalUrl('LIJST_HYPOTHEKEN'), {relatieId : relatieId}, function(response) {
                    return deferred.resolve(response);
                });

                return deferred.promise();
            },

            lijstHypotheekPakketten: function(relatieId){
                var deferred = $.Deferred();

    			$.get(navRegister.bepaalUrl('LIJST_HYPOTHEEKPAKKETTEN'), {relatieId : relatieId}, function(response) {
                    return deferred.resolve(response);
                });

                return deferred.promise();
            },

            opslaanHypotheek: function(data){
                var deferred = $.Deferred();

		    	$.ajax({
		            url: navRegister.bepaalUrl('OPSLAAN_HYPOTHEEK'),
		            type: 'POST',
		            data: data,
		            contentType: 'application/json; charset=utf-8',
                    success: function(response) {
                        return deferred.resolve(response);
                    },
                    error: function (response) {
                        return deferred.reject(response);
                    }
		        });

                return deferred.promise();
            },

            verwijderHypotheek: function(id){
				$.get(navRegister.bepaalUrl('VERWIJDER_HYPOTHEEK'), {"id" : id}, function() {});
            },

            lijstOpenAangiftes: function(relatie){
                var deferred = $.Deferred();

    			$.get(navRegister.bepaalUrl('LIJST_OPEN_AANGIFTES'), {relatie : relatie}, function(response) {
                    return deferred.resolve(response);
                });

                return deferred.promise();
            },

            lijstGeslotenAangiftes: function(relatie){
                var deferred = $.Deferred();

    			$.get(navRegister.bepaalUrl('LIJST_GESLOTEN_AANGIFTES'), {relatie : relatie}, function(response) {
                    return deferred.resolve(response);
                });

                return deferred.promise();
            },

            afrondenAangifte: function(data){
                var deferred = $.Deferred();

		    	$.ajax({
		            url: navRegister.bepaalUrl('AFRONDEN_AANGIFTE'),
		            type: 'POST',
		            data: data,
		            contentType: 'application/json; charset=utf-8',
                    success: function(response) {
                        return deferred.resolve(response);
                    },
                    error: function (response) {
                        return deferred.reject(response);
                    }
		        });

                return deferred.promise();
            },

            opslaanAangifte: function(data){
                var deferred = $.Deferred();

		    	$.ajax({
		            url: navRegister.bepaalUrl('OPSLAAN_AANGIFTE'),
		            type: 'POST',
		            data: data,
		            contentType: 'application/json; charset=utf-8',
                    success: function(response) {
                        return deferred.resolve(response);
                    },
                    error: function (response) {
                        return deferred.reject(response);
                    }
		        });

                return deferred.promise();
            }

        }
    }
);