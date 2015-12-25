define(["commons/3rdparty/log",
        "navRegister"],
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
                        return deferred.resolve(response);
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

            lijstRelaties: function(zoekTerm, weglaten){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_RELATIES'), {"zoekTerm" : zoekTerm, "weglaten" : weglaten});
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

            koppelOnderlingeRelatie: function(relatie, relatieMet, soortRelatie){
                var data = {};
                data.relatie = relatie;
                data.relatieMet = relatieMet;
                data.soortRelatie = soortRelatie;

                return this.voerUitPost(navRegister.bepaalUrl('KOPPELEN_ONDERLINGE_RELATIE'), JSON.stringify(data));
            },

            opslaanAdresBijRelatie: function(adres){
                var data = JSON.stringify(adres);
                log.debug(data);
                return this.voerUitPost(navRegister.bepaalUrl('OPSLAAN_ADRES_BIJ_RELATIE'), data);
            },

            lijstBedrijven: function(zoekTerm){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_BEDRIJVEN_BIJ_RELATIE'), {zoekTerm : zoekTerm});
            },

            opslaanBedrijf: function(data){
                log.debug(JSON.stringify(data));

                return this.voerUitPost(navRegister.bepaalUrl('OPSLAAN_BEDRIJF'), data);
            },

            leesBedrijf: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('LEES_BEDRIJF'), {"id" : id});
            },

            lijstVerzekeringsmaatschappijen: function(){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_VERZEKERINGSMAATSCHAPPIJEN'));
            },

            lijstParticulierePolissen: function(){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_PARTICULIEREPOLISSEN'));
            },

            lijstZakelijkePolissen: function(){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_ZAKELIJKEPOLISSEN'));
            },

            leesPolis: function(polisId){
                return this.voerUitGet(navRegister.bepaalUrl('LEES_POLIS'), {"id" : polisId});
            },

            lijstPolissen: function(relatieId){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_POLISSEN'), {relatieId : relatieId});
            },

            lijstPolissenBijBedrijf: function(bedrijfId){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_POLISSEN_BIJ_BEDRIJF'), {bedrijfId : bedrijfId});
            },

            verwijderBijlage: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('VERWIJDER_BIJLAGE'), {"id" : id});
            },

            wijzigOmschrijvingBijlage: function(id, nieuweOmschrijving){
                var data = {};
                data.bijlageId = id;
                data.nieuweOmschrijving = nieuweOmschrijving;

                return this.voerUitPost(navRegister.bepaalUrl('WIJZIG_OMSCHRIJVING_BIJLAGE'), JSON.stringify(data));
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

            lijstSchadesBijBedrijf: function(bedrijfId){
                return this.voerUitGet(navRegister.bepaalUrl('LIJST_SCHADES_BIJ_BEDRIJF'), {bedrijfId : bedrijfId});
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

            openTakenBijRelatie: function(relatieId){
                return this.voerUitGet(navRegister.bepaalUrl('OPEN_TAKEN_BIJ_RELATIE'), {"relatieId" : relatieId});
            },

            afhandelenTaak: function(data){
                return this.voerUitPost(navRegister.bepaalUrl('AFHANDELEN_TAAK'), data);
            },

            oppakkenTaak: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('OPPAKKEN_TAAK'), {"id" : id});
            },

            vrijgevenTaak: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('VRIJGEVEN_TAAK'), {"id" : id});
            },

            opslaanOpmerking: function(opmerking){
                return this.voerUitPost(navRegister.bepaalUrl('OPSLAAN_OPMERKING'), opmerking);
            },

            verwijderOpmerking: function(id){
                return this.voerUitGet(navRegister.bepaalUrl('VERWIJDER_OPMERKING'), {"id" : id});
            },

            ophalenAdresOpPostcode: function(postcode, huisnummer){
                return this.voerUitGet(navRegister.bepaalUrl('OPHALEN_ADRES_OP_POSTCODE'), {"postcode" : postcode, "huisnummer" : huisnummer});
            },

            ophalenJaarCijfers: function(bedrijfsId){
                return this.voerUitGet(navRegister.bepaalUrl('JAARCIJFERS_LIJST'), {'bedrijfsId' : bedrijfsId});
            },

            ophalenRisicoAnalyse: function(bedrijfsId){
                return this.voerUitGet(navRegister.bepaalUrl('RISICOANALYSE_LEES'), {'bedrijfsId' : bedrijfsId});
            }
        }
    }
);