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
                            {naam: 'OPSLAAN_CONTACTPERSOON',            url: BASISURL_RELATIEBEHEER + '/medewerker/gebruiker/opslaanContactPersoon'},
                            {naam: 'VERWIJDER_RELATIE',                 url: BASISURL_RELATIEBEHEER + '/medewerker/gebruiker/verwijderen'},
                            {naam: 'KOPPELEN_ONDERLINGE_RELATIE',       url: BASISURL_RELATIEBEHEER + '/medewerker/gebruiker/koppelenOnderlingeRelatie'},
                            {naam: 'OPSLAAN_ADRES_BIJ_RELATIE',         url: BASISURL_RELATIEBEHEER + '/medewerker/gebruiker/opslaanAdresBijRelatie'},

                            {naam: 'LIJST_ADRESSEN',                    url: BASISURL_RELATIEBEHEER + '/medewerker/adres/alles'},
                            {naam: 'OPSLAAN_ADRESSEN',                  url: BASISURL_RELATIEBEHEER + '/medewerker/adres/opslaan'},
                            {naam: 'VERWIJDER_ADRESSEN',                url: BASISURL_RELATIEBEHEER + '/medewerker/adres/verwijderen'},

                            {naam: 'LIJST_TELEFOONNUMMERS',             url: BASISURL_RELATIEBEHEER + '/medewerker/telefoonnummer/alles'},
                            {naam: 'OPSLAAN_TELEFOONNUMMERS',           url: BASISURL_RELATIEBEHEER + '/medewerker/telefoonnummer/opslaan'},
                            {naam: 'VERWIJDER_TELEFOONNUMMERS',         url: BASISURL_RELATIEBEHEER + '/medewerker/telefoonnummer/verwijderen'},

                            {naam: 'LIJST_REKENINGNUMMERS',             url: BASISURL_RELATIEBEHEER + '/medewerker/rekeningnummer/alles'},
                            {naam: 'OPSLAAN_REKENINGNUMMERS',           url: BASISURL_RELATIEBEHEER + '/medewerker/rekeningnummer/opslaan'},
                            {naam: 'VERWIJDER_REKENINGNUMMERS',         url: BASISURL_RELATIEBEHEER + '/medewerker/rekeningnummer/verwijderen'},

                            {naam: 'LIJST_CONTACTPERSONEN',             url: BASISURL_RELATIEBEHEER + '/medewerker/gebruiker/alleContactPersonen'},

                            {naam: 'LIJST_BEDRIJVEN_BIJ_RELATIE',       url: BASISURL_RELATIEBEHEER + '/medewerker/bedrijf/lijst'},
                            {naam: 'OPSLAAN_BEDRIJF',                   url: BASISURL_RELATIEBEHEER + '/medewerker/bedrijf/opslaan'},
                            {naam: 'LEES_BEDRIJF',                      url: BASISURL_RELATIEBEHEER + '/medewerker/bedrijf/lees'},

                            {naam: 'LIJST_VERZEKERINGSMAATSCHAPPIJEN',  url: BASISURL_RELATIEBEHEER + '/medewerker/overig/lijstVerzekeringsMaatschappijen'},
                            {naam: 'LIJST_PARTICULIEREPOLISSEN',        url: BASISURL_RELATIEBEHEER + '/medewerker/polis/alleParticulierePolisSoorten'},
                            {naam: 'LIJST_ZAKELIJKEPOLISSEN',           url: BASISURL_RELATIEBEHEER + '/medewerker/polis/alleZakelijkePolisSoorten'},

                            {naam: 'LEES_POLIS',                        url: BASISURL_RELATIEBEHEER + '/medewerker/polis/lees'},
                            {naam: 'LIJST_POLISSEN',                    url: BASISURL_RELATIEBEHEER + '/medewerker/polis/lijst'},
                            {naam: 'LIJST_POLISSEN_BIJ_BEDRIJF',        url: BASISURL_RELATIEBEHEER + '/medewerker/polis/lijstBijBedrijf'},
                            {naam: 'BEEINDIG_POLIS',                    url: BASISURL_RELATIEBEHEER + '/medewerker/polis/beeindigen'},
                            {naam: 'OPSLAAN_POLIS',                     url: BASISURL_RELATIEBEHEER + '/medewerker/polis/opslaan'},
                            {naam: 'VERWIJDER_POLIS',                   url: BASISURL_RELATIEBEHEER + '/medewerker/polis/verwijder'},

                            {naam: 'VERWIJDER_BIJLAGE',                 url: BASISURL_RELATIEBEHEER + '/medewerker/bijlage/verwijder'},
                            {naam: 'UPLOAD_BIJLAGE',                    url: BASISURL_RELATIEBEHEER + '/medewerker/bijlage/uploadBijlage'},
                            {naam: 'WIJZIG_OMSCHRIJVING_BIJLAGE',       url: BASISURL_RELATIEBEHEER + '/medewerker/bijlage/wijzigOmschrijvingBijlage'},
                            {naam: 'LIJST_BIJLAGES',                    url: BASISURL_RELATIEBEHEER + '/medewerker/bijlage/alles'},
                            {naam: 'LIJST_GROEP_BIJLAGES',              url: BASISURL_RELATIEBEHEER + '/medewerker/bijlage/alleGroepen'},

                            {naam: 'OPSLAAN_SCHADE',                    url: BASISURL_RELATIEBEHEER + '/medewerker/schade/opslaan'},
                            {naam: 'VERWIJDER_SCHADE',                  url: BASISURL_RELATIEBEHEER + '/medewerker/schade/verwijder'},
                            {naam: 'LEES_SCHADE',                       url: BASISURL_RELATIEBEHEER + '/medewerker/schade/lees'},
                            {naam: 'LIJST_SCHADES',                     url: BASISURL_RELATIEBEHEER + '/medewerker/schade/lijst'},
                            {naam: 'LIJST_SCHADES_BIJ_BEDRIJF',         url: BASISURL_RELATIEBEHEER + '/medewerker/schade/lijstBijBedrijf'},

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
                            {naam: 'OPEN_TAKEN_BIJ_RELATIE',            url: BASISURL_RELATIEBEHEER + '/medewerker/taak/alleOpenTakenVoorRelatie'},

                            {naam: 'OPSLAAN_OPMERKING',                 url: BASISURL_RELATIEBEHEER + '/medewerker/opmerking/opslaan'},
                            {naam: 'VERWIJDER_OPMERKING',               url: BASISURL_RELATIEBEHEER + '/medewerker/opmerking/verwijder'},
                            {naam: 'LIJST_OPMERKINGEN',                 url: BASISURL_RELATIEBEHEER + '/medewerker/opmerking/alles'},

                            {naam: 'LOG4JAVASCRIPT',                    url: BASISURL_RELATIEBEHEER + '/authorisatie/log4j/log4javascript'},

                            {naam: 'JAARCIJFERS_LIJST',                 url: BASISURL_RELATIEBEHEER + '/medewerker/jaarcijfers/lijst'},

                            {naam: 'RISICOANALYSE_LEES',                url: BASISURL_RELATIEBEHEER + '/medewerker/risicoanalyse/lees'},

                            {naam: 'LIJST_COMMUNICATIEPRODUCTEN',       url: BASISURL_RELATIEBEHEER + '/medewerker/communicatieproduct/alles'},
                            {naam: 'MARKEER_ALS_GELEZEN',               url: BASISURL_RELATIEBEHEER + '/medewerker/communicatieproduct/markeerAlsGelezen'},
                            {naam: 'LEES_COMMUNICATIEPRODUCT',          url: BASISURL_RELATIEBEHEER + '/medewerker/communicatieproduct/lees'},
                            {naam: 'VERSTUREN_COMMUNICATIEPRODUCT',     url: BASISURL_RELATIEBEHEER + '/medewerker/communicatieproduct/versturen'},
                            {naam: 'OPSLAAN_COMMUNICATIEPRODUCT',       url: BASISURL_RELATIEBEHEER + '/medewerker/communicatieproduct/nieuw'},

                            {naam: 'TRACKANDTRACEID',                   url: BASISURL_RELATIEBEHEER + '/medewerker/overig/getTrackAndTraceId'}
                        ];

                var url = '';

                for (var i = 0; i < vars.length; i++) {
                    if(welkeFunctie === vars[i].naam) {
                        url = vars[i].url;
                        break;
                    }
                }

                return url;

            }
        }
    }
);