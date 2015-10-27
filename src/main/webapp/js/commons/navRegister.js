define([ ],
    function() {

        return {

            bepaalUrl: function(welkeFunctie){
                var BASISURL_RELATIEBEHEER = '../dejonge/rest';

                var vars = [{naam: 'INLOGGEN',                          url: BASISURL_RELATIEBEHEER + '/authorisatie/authorisatie/inloggen'},
                            {naam: 'INGELOGDE_GEBRUIKER',               url: BASISURL_RELATIEBEHEER + '/authorisatie/authorisatie/ingelogdeGebruiker'},
                            {naam: 'UITLOGGEN',                         url: BASISURL_RELATIEBEHEER + '/authorisatie/authorisatie/uitloggen'},

                            {naam: 'LIJST_RELATIES',                    url: BASISURL_RELATIEBEHEER + '/medewerker/gebruiker/zoekOpNaamAdresOfPolisNummer'},
                            {naam: 'LEES_RELATIE',                      url: BASISURL_RELATIEBEHEER + '/medewerker/gebruiker/lees'},
                            {naam: 'OPSLAAN_RELATIE',                   url: BASISURL_RELATIEBEHEER + '/medewerker/gebruiker/opslaan'},
                            {naam: 'VERWIJDER_RELATIE',                 url: BASISURL_RELATIEBEHEER + '/medewerker/gebruiker/verwijderen'},
                            {naam: 'KOPPELEN_ONDERLINGE_RELATIE',       url: BASISURL_RELATIEBEHEER + '/medewerker/gebruiker/koppelenOnderlingeRelatie'},

                            {naam: 'LIJST_BEDRIJVEN_BIJ_RELATIE',       url: BASISURL_RELATIEBEHEER + '/medewerker/bedrijf/lijst'},
                            {naam: 'OPSLAAN_BEDRIJF',                   url: BASISURL_RELATIEBEHEER + '/medewerker/gebruiker/opslaanBedrijf'},
                            {naam: 'LEES_BEDRIJF',                      url: BASISURL_RELATIEBEHEER + '/medewerker/bedrijf/lees'},

                            {naam: 'LIJST_VERZEKERINGSMAATSCHAPPIJEN',  url: BASISURL_RELATIEBEHEER + '/medewerker/overig/lijstVerzekeringsMaatschappijen'},

                            {naam: 'LEES_POLIS',                        url: BASISURL_RELATIEBEHEER + '/medewerker/polis/lees'},
                            {naam: 'LIJST_POLISSEN',                    url: BASISURL_RELATIEBEHEER + '/medewerker/polis/lijst'},
                            {naam: 'BEEINDIG_POLIS',                    url: BASISURL_RELATIEBEHEER + '/medewerker/polis/beeindigen'},
                            {naam: 'OPSLAAN_POLIS',                     url: BASISURL_RELATIEBEHEER + '/medewerker/polis/opslaan'},
                            {naam: 'VERWIJDER_POLIS',                   url: BASISURL_RELATIEBEHEER + '/medewerker/polis/verwijder'},

                            {naam: 'VERWIJDER_BIJLAGE',                 url: BASISURL_RELATIEBEHEER + '/medewerker/bijlage/verwijder'},
                            {naam: 'UPLOAD_BIJLAGE',                    url: BASISURL_RELATIEBEHEER + '/medewerker/bijlage/uploadBijlage'},

                            {naam: 'OPSLAAN_SCHADE',                    url: BASISURL_RELATIEBEHEER + '/medewerker/schade/opslaan'},
                            {naam: 'VERWIJDER_SCHADE',                  url: BASISURL_RELATIEBEHEER + '/medewerker/schade/verwijder'},
                            {naam: 'LEES_SCHADE',                       url: BASISURL_RELATIEBEHEER + '/medewerker/schade/lees'},
                            {naam: 'LIJST_SCHADES',                     url: BASISURL_RELATIEBEHEER + '/medewerker/schade/lijst'},

                            {naam: 'LIJST_STATUS_SCHADE',               url: BASISURL_RELATIEBEHEER + '/medewerker/overig/lijstStatusSchade'},
                            {naam: 'OPHALEN_ADRES_OP_POSTCODE',         url: BASISURL_RELATIEBEHEER + '/medewerker/overig/ophalenAdresOpPostcode'},

                            {naam: 'LIJST_SOORTEN_HYPOTHEEK',           url: BASISURL_RELATIEBEHEER + '/medewerker/hypotheek/alleSoortenHypotheek'},
                            {naam: 'LIJST_HYPOTHEKEN_INCL_PAKKETTEN',   url: BASISURL_RELATIEBEHEER + '/medewerker/hypotheek/lijstHypothekenInclDePakketten'},
                            {naam: 'LEES_HYPOTHEEK',                    url: BASISURL_RELATIEBEHEER + '/medewerker/hypotheek/lees'},
                            {naam: 'LIJST_HYPOTHEKEN',                  url: BASISURL_RELATIEBEHEER + '/medewerker/hypotheek/lijstHypotheken'},
                            {naam: 'LIJST_HYPOTHEEKPAKKETTEN',          url: BASISURL_RELATIEBEHEER + '/medewerker/hypotheek/lijstHypotheekPakketten'},
                            {naam: 'OPSLAAN_HYPOTHEEK',                 url: BASISURL_RELATIEBEHEER + '/medewerker/hypotheek/opslaan'},
                            {naam: 'VERWIJDER_HYPOTHEEK',               url: BASISURL_RELATIEBEHEER + '/medewerker/hypotheek/verwijder'},

                            {naam: 'LIJST_OPEN_AANGIFTES',              url: BASISURL_RELATIEBEHEER + '/medewerker/aangifte/openAangiftes'},
                            {naam: 'LIJST_GESLOTEN_AANGIFTES',          url: BASISURL_RELATIEBEHEER + '/medewerker/aangifte/geslotenAangiftes'},
                            {naam: 'AFRONDEN_AANGIFTE',                 url: BASISURL_RELATIEBEHEER + '/medewerker/aangifte/afronden'},
                            {naam: 'OPSLAAN_AANGIFTE',                  url: BASISURL_RELATIEBEHEER + '/medewerker/aangifte/opslaan'},

                            {naam: 'LEES_TAAK',                         url: BASISURL_RELATIEBEHEER + '/medewerker/taak/lees'},
                            {naam: 'LIJST_TAKEN',                       url: BASISURL_RELATIEBEHEER + '/medewerker/taak/lijst'},
                            {naam: 'AFHANDELEN_TAAK',                   url: BASISURL_RELATIEBEHEER + '/medewerker/taak/afhandelen'},
                            {naam: 'VRIJGEVEN_TAAK',                    url: BASISURL_RELATIEBEHEER + '/medewerker/taak/vrijgeven'},
                            {naam: 'OPPAKKEN_TAAK',                     url: BASISURL_RELATIEBEHEER + '/medewerker/taak/oppakken'},

                            {naam: 'OPSLAAN_OPMERKING',                 url: BASISURL_RELATIEBEHEER + '/medewerker/opmerking/opslaan'},
                            {naam: 'LOG4JAVASCRIPT',                    url: BASISURL_RELATIEBEHEER + '/authorisatie/authorisatie/log4javascript'},
                        ];

                var url = '';

                for (var i = 0; i < vars.length; i++) {
                    if(welkeFunctie === vars[i].naam) {
                        url = vars[i].url;
                        break;
                    }
                }
//                log.debug(url);

                return url;

            }
        }
    }
);