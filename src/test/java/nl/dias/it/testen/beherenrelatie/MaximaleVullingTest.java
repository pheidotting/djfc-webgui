package nl.dias.it.testen.beherenrelatie;

import nl.dias.it.schermen.beherenrelatie.BeherenRelatie;
import nl.dias.it.testen.AbstractITest;
import nl.lakedigital.djfc.commons.json.JsonAdres;
import nl.lakedigital.djfc.commons.json.JsonFoutmelding;
import nl.lakedigital.djfc.commons.json.JsonLijstRelaties;
import nl.lakedigital.djfc.commons.json.JsonRelatie;
import org.openqa.selenium.support.PageFactory;

import java.util.ArrayList;

import static nl.dias.it.Hulp.naarAdres;
import static nl.dias.it.Hulp.wachtFf;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class MaximaleVullingTest extends AbstractITest {
    private JsonAdres jsonAdres;

    @Override
    protected void voeruitTest() throws Exception {
        BeherenRelatie pagina = PageFactory.initElements(driver, BeherenRelatie.class);
        naarAdres(driver, BASIS_URL + pagina.URL);

        String achternaam = pagina.vulMaximaal();

        int indexPostcode1 = pagina.voegAdresToe();
        pagina.vulAdres(indexPostcode1, jsonAdres, "1234ZZ", "1234 ZZ", "345");
        int indexPostcode2 = pagina.voegAdresToe();
        pagina.vulAdres(indexPostcode2, jsonAdres, "8765KK", "8765 KK", "398");
        pagina.verwijderAdres(indexPostcode2, 2, 1);

        int indexRekening1 = pagina.voegRekeningToe();
        pagina.vulRekening(indexRekening1, "NL40 RABO 1234 5678 90", "NL40RABO1234567890");
        int indexRekening2 = pagina.voegRekeningToe();
        pagina.vulRekening(indexRekening2, "NL06 RABO 0987 6543 21", "NL06RABO0987654321");
        pagina.verwijderRekening(indexRekening2, 2, 1);

        int indexTelefoon1 = pagina.voegTelefoonnummerToe();
        pagina.vulTelefoonnummer(indexTelefoon1, "0612345678", "06 - 12 34 56 78");
        int indexTelefoon2 = pagina.voegTelefoonnummerToe();
        pagina.vulTelefoonnummer(indexTelefoon2, "0591345678", "0591 - 34 56 78");
        int indexTelefoon3 = pagina.voegTelefoonnummerToe();
        pagina.vulTelefoonnummer(indexTelefoon3, "0538765432", "053 - 876 54 32");
        pagina.verwijderTelefoonnummer(indexTelefoon2, 3, 2);

        //opmerking opslaan
        String opmerkingTekst = pagina.opslaanNieuweOpmerking();
        assertEquals(opmerkingTekst, pagina.getTekst1());

        pagina.opslaan();

        wachtFf();

        assertTrue(driver.getCurrentUrl().endsWith("lijstRelaties/" + achternaam));
    }

    @Override
    protected void doeExpects() {
        expectGet("/dejonge/rest/medewerker/gebruiker/lees", gson.toJson(new JsonRelatie()));
        expectGet("/dejonge/rest/medewerker/taak/alleOpenTakenVoorRelatie", gson.toJson(new ArrayList<>()));
        expectPost("/dejonge/rest/medewerker/gebruiker/opslaan", gson.toJson(new JsonFoutmelding()));
        expectGet("/dejonge/rest/medewerker/gebruiker/zoekOpNaamAdresOfPolisNummer", gson.toJson(new JsonLijstRelaties()));
        jsonAdres = new JsonAdres();
        jsonAdres.setStraat("straat");
        jsonAdres.setHuisnummer(1L);
        jsonAdres.setPlaats("plaats");
        jsonAdres.setPostcode("1234AA");
        jsonAdres.setToevoeging("toevoeging");

        expectGet("/dejonge/rest/medewerker/overig/ophalenAdresOpPostcode", gson.toJson(jsonAdres));
        expectOpmerkingOpslaan();
    }
}
