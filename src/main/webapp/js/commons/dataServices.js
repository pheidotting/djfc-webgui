define(["commons/3rdparty/log",
        "navRegister",],
    function(log, navRegister) {

        return {
            voerUitGet: function(url, data){
                return $.get(url, data);
            },

            voerUitPost: function(url, data){
                var deferred = $.Deferred();

                $.ajax({
                    type: "POST",
                    url: url,
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

            inloggen: function(data){
                return this.voerUitPost(navRegister.bepaalUrl('INLOGGEN'), data);
            },

            haalIngelogdeGebruiker: function(){
                return this.voerUitGet(navRegister.bepaalUrl('INGELOGDE_GEBRUIKER'));
	        },

            uitloggen: function(){
                return this.voerUitGet(navRegister.bepaalUrl('UITLOGGEN'));
            },

            lijstRelaties: function(zoekTerm){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_RELATIES'), {"zoekTerm" : zoekTerm});
            },

            leesRelatie: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('LEES_RELATIE'), {id : id});
            },

            opslaanRelatie: function(data){
                return this.voerUitPost(navRegister.bepaalUrl('OPSLAAN_RELATIE'), data);
            },

            verwijderRelatie: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('VERWIJDER_RELATIE'), {id : id});
            },

            lijstBedrijven: function(relatieId){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_BEDRIJVEN_BIJ_RELATIE'), {relatieId : relatieId});
            },

            opslaanBedrijf: function(data){
                return this.voerUitPost(navRegister.bepaalUrl('OPSLAAN_BEDRIJF'), data);
            },

            leesBedrijf: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('LEES_BEDRIJF'), {"id" : id});
            },

            lijstVerzekeringsmaatschappijen: function(){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_VERZEKERINGSMAATSCHAPPIJEN'));
            },

            leesPolis: function(polisId){
                return this.voerUitGet(navRegister.bepaalUrl('LEES_POLIS'), {"id" : polisId});
            },

            lijstPolissen: function(relatieId){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_POLISSEN'), {relatieId : relatieId});
            },

            verwijderBijlage: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('VERWIJDER_BIJLAGE'), {"id" : id});
            },

            beindigPolis: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('BEEINDIG_POLIS'), {"id" : id});
            },

            opslaanPolis: function(data){
                return this.voerUitPost(navRegister.bepaalUrl('OPSLAAN_POLIS'), data);
            },

            verwijderPolis: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('VERWIJDER_POLIS'), {"id" : id});
            },

            opslaanSchade: function(data){
                return this.voerUitPost(navRegister.bepaalUrl('OPSLAAN_SCHADE'), data);
            },

            verwijderSchade: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('VERWIJDER_SCHADE'), {"id" : id});
            },

            lijstStatusSchade: function(){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_STATUS_SCHADE'), {"id" : id});
            },

            leesSchade: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('LEES_SCHADE'), {"id" : id});
            },

            lijstSchades: function(relatieId){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_SCHADES'), {relatieId : relatieId});
            },

            lijstSoortenHypotheek: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_SOORTEN_HYPOTHEEK'), {"id" : id});
            },

            lijstHypothekenInclDePakketten: function(relatieId){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_HYPOTHEKEN_INCL_PAKKETTEN'), {relatieId : relatieId});
            },

            leesHypotheek: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('LEES_HYPOTHEEK'), {id : id});
            },

            lijstHypotheken: function(relatieId){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_HYPOTHEKEN'), {relatieId : relatieId});
            },

            lijstHypotheekPakketten: function(relatieId){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_HYPOTHEEKPAKKETTEN'), {relatieId : relatieId});
            },

            opslaanHypotheek: function(data){
                return this.voerUitPost(navRegister.bepaalUrl('OPSLAAN_HYPOTHEEK'), data);
            },

            verwijderHypotheek: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('VERWIJDER_HYPOTHEEK'), {"id" : id});
            },

            lijstOpenAangiftes: function(relatie){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_OPEN_AANGIFTES'), {relatie : relatie});
            },

            lijstGeslotenAangiftes: function(relatie){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_GESLOTEN_AANGIFTES'), {relatie : relatie});
            },

            afrondenAangifte: function(data){
                return this.voerUitPost(navRegister.bepaalUrl('AFRONDEN_AANGIFTE'), data);
            },

            opslaanAangifte: function(data){
                return this.voerUitPost(navRegister.bepaalUrl('OPSLAAN_AANGIFTE'), data);
            },

            leesTaak: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('LEES_TAAK'), {"id" : id});
            },

            lijstTaken: function(){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_TAKEN'));
            },

            afhandelenTaak: function(data){
                return this.voerUitPost(navRegister.bepaalUrl('AFHANDELEN_TAAK'), data);
            },

            oppakkenTaak: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('OPPAKKEN_TAAK'), {"id" : id});
            },

            vrijgevenTaak: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('VRIJGEVEN_TAAK'), {"id" : id});
            }

        }
    }
);