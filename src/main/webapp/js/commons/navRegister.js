define([ "commons/3rdparty/log"],
    function(log) {

        return {

            bepaalUrl: function(welkeFunctie){
                var BASISURL_RELATIEBEHEER = '../dejonge/rest';

                var INLOGGEN = 'INLOGGEN';
                var INGELOGDE_GEBRUIKER = 'INGELOGDE_GEBRUIKER';
                var UITLOGGEN = 'UITLOGGEN';

                var LIJST_RELATIES = 'LIJST_RELATIES';
                var LEES_RELATIE = 'LEES_RELATIE';
                var OPSLAAN_RELATIE = 'OPSLAAN_RELATIE';
                var VERWIJDER_RELATIE = 'VERWIJDER_RELATIE';

                var LIJST_BEDRIJVEN_BIJ_RELATIE = 'LIJST_BEDRIJVEN_BIJ_RELATIE';
                var OPSLAAN_BEDRIJF = 'OPSLAAN_BEDRIJF';
                var LEES_BEDRIJF = 'LEES_BEDRIJF';

                var LIJST_VERZEKERINGSMAATSCHAPPIJEN = 'LIJST_VERZEKERINGSMAATSCHAPPIJEN';

                var LEES_POLIS = 'LEES_POLIS';
                var LIJST_POLISSEN = 'LIJST_POLISSEN';
                var BEEINDIG_POLIS = 'BEEINDIG_POLIS';
                var OPSLAAN_POLIS = 'OPSLAAN_POLIS';
                var VERWIJDER_POLIS = 'VERWIJDER_POLIS';

                var VERWIJDER_BIJLAGE = 'VERWIJDER_BIJLAGE';
                var UPLOAD_BIJLAGE_BIJ_POLIS = 'UPLOAD_BIJLAGE_BIJ_POLIS';

                var OPSLAAN_SCHADE = 'OPSLAAN_SCHADE';
                var VERWIJDER_SCHADE = 'VERWIJDER_SCHADE';
                var LIJST_STATUS_SCHADE = 'LIJST_STATUS_SCHADE';
                var LEES_SCHADE = 'LEES_SCHADE';
                var LIJST_SCHADES = 'LIJST_SCHADES';

                var LIJST_SOORTEN_HYPOTHEEK = 'LIJST_SOORTEN_HYPOTHEEK';
                var LIJST_HYPOTHEKEN_INCL_PAKKETTEN = 'LIJST_HYPOTHEKEN_INCL_PAKKETTEN';
                var LEES_HYPOTHEEK = 'LEES_HYPOTHEEK';
                var LIJST_HYPOTHEKEN = 'LIJST_HYPOTHEKEN';
                var LIJST_HYPOTHEEKPAKKETTEN = 'LIJST_HYPOTHEEKPAKKETTEN';
                var OPSLAAN_HYPOTHEEK = 'OPSLAAN_HYPOTHEEK';
                var VERWIJDER_HYPOTHEEK = 'VERWIJDER_HYPOTHEEK';

                var LIJST_OPEN_AANGIFTES = 'LIJST_OPEN_AANGIFTES';
                var LIJST_GESLOTEN_AANGIFTES = 'LIJST_GESLOTEN_AANGIFTES';
                var AFRONDEN_AANGIFTE = 'AFRONDEN_AANGIFTE';
                var OPSLAAN_AANGIFTE = 'OPSLAAN_AANGIFTE';

                if(welkeFunctie == INLOGGEN){
                    return BASISURL_RELATIEBEHEER + "/authorisatie/authorisatie/inloggen";
                }else if(welkeFunctie == INGELOGDE_GEBRUIKER){
                    return BASISURL_RELATIEBEHEER + "/authorisatie/authorisatie/ingelogdeGebruiker";
                }else if(welkeFunctie == UITLOGGEN){
                    return BASISURL_RELATIEBEHEER + "/authorisatie/authorisatie/uitloggen";

                }else if(welkeFunctie == LIJST_RELATIES){
                    return BASISURL_RELATIEBEHEER + "/medewerker/gebruiker/zoekOpNaamAdresOfPolisNummer";
                }else if(welkeFunctie == LEES_RELATIE){
                    return BASISURL_RELATIEBEHEER + "/medewerker/gebruiker/lees";
                }else if(welkeFunctie == OPSLAAN_RELATIE){
                    return BASISURL_RELATIEBEHEER + "/medewerker/gebruiker/opslaan";
                }else if(welkeFunctie == VERWIJDER_RELATIE){
                    return BASISURL_RELATIEBEHEER + "/medewerker/gebruiker/verwijderen";

                }else if(welkeFunctie == LIJST_BEDRIJVEN_BIJ_RELATIE){
                    return BASISURL_RELATIEBEHEER + "/medewerker/bedrijf/lijst";
                }else if(welkeFunctie == OPSLAAN_BEDRIJF){
                    return BASISURL_RELATIEBEHEER + "/medewerker/gebruiker/opslaanBedrijf";
                }else if(welkeFunctie == LEES_BEDRIJF){
                    return BASISURL_RELATIEBEHEER + "/medewerker/bedrijf/lees";

                }else if(welkeFunctie == LIJST_VERZEKERINGSMAATSCHAPPIJEN){
                    return BASISURL_RELATIEBEHEER + "/medewerker/overig/lijstVerzekeringsMaatschappijen";

                }else if(welkeFunctie == LEES_POLIS){
                    return BASISURL_RELATIEBEHEER + "/medewerker/polis/lees";
                }else if(welkeFunctie == LIJST_POLISSEN){
                    return BASISURL_RELATIEBEHEER + "/medewerker/polis/lijst";
                }else if(welkeFunctie == BEEINDIG_POLIS){
                    return BASISURL_RELATIEBEHEER + "/medewerker/polis/beeindigen";
                }else if(welkeFunctie == OPSLAAN_POLIS){
                    return BASISURL_RELATIEBEHEER + "/medewerker/polis/opslaan";
                }else if(welkeFunctie == VERWIJDER_POLIS){
                    return BASISURL_RELATIEBEHEER + "/medewerker/polis/verwijder";

                }else if(welkeFunctie == VERWIJDER_BIJLAGE){
                    return BASISURL_RELATIEBEHEER + "/medewerker/bijlage/verwijder";
                }else if(welkeFunctie == UPLOAD_BIJLAGE_BIJ_POLIS){
                    return BASISURL_RELATIEBEHEER + "/medewerker/bijlage/uploadPolis1File";

                }else if(welkeFunctie == OPSLAAN_SCHADE){
                    return BASISURL_RELATIEBEHEER + "/medewerker/schade/opslaan";
                }else if(welkeFunctie == VERWIJDER_SCHADE){
                    return BASISURL_RELATIEBEHEER + "/medewerker/schade/verwijder";
                }else if(welkeFunctie == LIJST_STATUS_SCHADE){
                    return BASISURL_RELATIEBEHEER + "/medewerker/overig/lijstStatusSchade";
                }else if(welkeFunctie == LEES_SCHADE){
                    return BASISURL_RELATIEBEHEER + "/medewerker/schade/lees";
                }else if(welkeFunctie == LIJST_SCHADES){
                    return BASISURL_RELATIEBEHEER + "/medewerker/schade/lijst";

                }else if(welkeFunctie == LIJST_SOORTEN_HYPOTHEEK){
                    return BASISURL_RELATIEBEHEER + "/medewerker/hypotheek/alleSoortenHypotheek";
                }else if(welkeFunctie == LIJST_HYPOTHEKEN_INCL_PAKKETTEN){
                    return BASISURL_RELATIEBEHEER + "/medewerker/hypotheek/lijstHypothekenInclDePakketten";
                }else if(welkeFunctie == LEES_HYPOTHEEK){
                    return BASISURL_RELATIEBEHEER + "/medewerker/hypotheek/lees";
                }else if(welkeFunctie == LIJST_HYPOTHEKEN){
                    return BASISURL_RELATIEBEHEER + "/medewerker/hypotheek/lijstHypotheken";
                }else if(welkeFunctie == LIJST_HYPOTHEEKPAKKETTEN){
                    return BASISURL_RELATIEBEHEER + "/medewerker/hypotheek/lijstHypotheekPakketten";
                }else if(welkeFunctie == OPSLAAN_HYPOTHEEK){
                    return BASISURL_RELATIEBEHEER + "/medewerker/hypotheek/opslaan";
                }else if(welkeFunctie == VERWIJDER_HYPOTHEEK){
                    return BASISURL_RELATIEBEHEER + "/medewerker/hypotheek/verwijder";

                }else if(welkeFunctie == LIJST_OPEN_AANGIFTES){
                    return BASISURL_RELATIEBEHEER + "/medewerker/aangifte/openAangiftes";
                }else if(welkeFunctie == LIJST_GESLOTEN_AANGIFTES){
                    return BASISURL_RELATIEBEHEER + "/medewerker/aangifte/geslotenAangiftes";
                }else if(welkeFunctie == AFRONDEN_AANGIFTE){
                    return BASISURL_RELATIEBEHEER + "/medewerker/aangifte/afronden";
                }else if(welkeFunctie == OPSLAAN_AANGIFTE){
                    return BASISURL_RELATIEBEHEER + "/medewerker/aangifte/opslaan";
                }
            }
        }
    }
);