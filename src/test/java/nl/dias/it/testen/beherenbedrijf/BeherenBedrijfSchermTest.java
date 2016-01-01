package nl.dias.it.testen.beherenbedrijf;

import nl.dias.commons.test.TestCase;
import nl.dias.it.schermen.BeherenBedrijf;
import nl.dias.it.testen.AbstractITest;
import nl.lakedigital.djfc.commons.json.JsonAdres;
import nl.lakedigital.djfc.commons.json.JsonBedrijf;
import nl.lakedigital.djfc.commons.json.JsonFoutmelding;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static nl.dias.commons.test.TestCase.Testcase.*;
import static nl.dias.it.Hulp.*;
import static org.junit.Assert.*;

public class BeherenBedrijfSchermTest extends AbstractITest {

    private JsonAdres jsonAdres;

    @Override
    protected void doeExpects() {
        jsonAdres = new JsonAdres();
        jsonAdres.setStraat("straat");
        jsonAdres.setHuisnummer(1L);
        jsonAdres.setPlaats("plaats");
        jsonAdres.setPostcode("1234AA");
        jsonAdres.setToevoeging("toevoeging");

        expectGet("/dejonge/rest/medewerker/bedrijf/lees", gson.toJson(new JsonBedrijf()));
        expectGet("/dejonge/rest/medewerker/overig/ophalenAdresOpPostcode", gson.toJson(jsonAdres));
        expectPost("/dejonge/rest/medewerker/bedrijf/opslaan", gson.toJson(new JsonFoutmelding()));
    }

    @Override
    public void voeruitTest() throws Exception {
        BeherenBedrijf pagina = PageFactory.initElements(driver, BeherenBedrijf.class);
        naarAdres(driver, BASIS_URL + pagina.URL);

        pagina.vulMaximaal();

        //DJFC-150
        @TestCase(TESTCASE = DJFC150) WebElement nulZesTelefoonnummer = pagina.voegNieuweTelefoonNummerToe();
        pagina.vulTelefoonnummerMaximaal();
        vulVeld(nulZesTelefoonnummer, "0612345678");
        wachtFf();
        assertEquals(getText(nulZesTelefoonnummer), "06 - 12 34 56 78");

        //DJFC-151
        @TestCase(TESTCASE = DJFC151) WebElement vierCijferigNetNummerTelefoonnummer = pagina.voegNieuweTelefoonNummerToe();
        WebElement verwijderTelefoonnummerLink = pagina.laatsteTelefoonnummerVerwijderLink();
        pagina.vulTelefoonnummerMaximaal();
        vulVeld(vierCijferigNetNummerTelefoonnummer, "0591123456");
        wachtFf();
        assertEquals(getText(vierCijferigNetNummerTelefoonnummer), "0591 - 12 34 56");

        //DJFC-152
        @TestCase(TESTCASE = DJFC152) WebElement drieCijferigNetNummerTelefoonnummer = pagina.voegNieuweTelefoonNummerToe();
        pagina.vulTelefoonnummerMaximaal();
        vulVeld(drieCijferigNetNummerTelefoonnummer, "0531234567");
        wachtFf();
        assertEquals(getText(drieCijferigNetNummerTelefoonnummer), "053 - 123 45 67");

        //Onderstaand checkt of het 3 verschillende telefoonnummers zijn, dus : DJFC-153
        assertFalse(nulZesTelefoonnummer.equals(vierCijferigNetNummerTelefoonnummer));
        assertFalse(nulZesTelefoonnummer.equals(drieCijferigNetNummerTelefoonnummer));
        assertFalse(vierCijferigNetNummerTelefoonnummer.equals(drieCijferigNetNummerTelefoonnummer));

        @TestCase(TESTCASE = DJFC155) WebElement postcode = pagina.voegNieuwAdresToe(true);
        ;
        pagina.vulAdresMaximaal(jsonAdres, "1234AA", "1");
        //DJFC-156
        assertEquals("1234 AA", getText(postcode));

        @TestCase(TESTCASE = DJFC157) WebElement cp = pagina.voegNieuwContactpersoonToe();
        ;
        pagina.vulContactPersoon();
        assertNotNull(cp);

        @TestCase(TESTCASE = DJFC158) WebElement telefoonnummerBijCP = pagina.voegTelefoonNummerToeBijContactpersoon();
        pagina.vulTelefoonnummerMaximaal();
        vulVeld(telefoonnummerBijCP, "0698765432");
        assertEquals("06 - 98 76 54 32", getText(telefoonnummerBijCP));

        //DJFC-159
        assertEquals(4, pagina.getTelefoonnummers().size());
        klikEnWacht(verwijderTelefoonnummerLink);
        assertEquals(3, pagina.getTelefoonnummers().size());

        @TestCase(TESTCASE = DJFC161) WebElement cp2 = pagina.voegNieuwContactpersoonToe();
        ;
        WebElement cp2Verwijder = pagina.vulContactPersoon();
        assertNotNull(cp2);
        WebElement telefoonnummerBijCP2 = pagina.voegTelefoonNummerToeBijContactpersoon();
        pagina.vulTelefoonnummerMaximaal();
        WebElement telefoonnummerBijCP2Verwijder = pagina.laatsteTelefoonnummerVerwijderLink();
        vulVeld(telefoonnummerBijCP, "0698765433");
        assertEquals("06 - 98 76 54 33", getText(telefoonnummerBijCP));

        //DJFC-162
        assertEquals(4, pagina.getTelefoonnummers().size());
        klikEnWacht(telefoonnummerBijCP2Verwijder);
        assertEquals(3, pagina.getTelefoonnummers().size());

        assertEquals(2, pagina.getContactpersonen().size());
        klikEnWacht(cp2Verwijder);
        assertEquals(1, pagina.getContactpersonen().size());

        @TestCase(TESTCASE = DJFC160) WebElement verwijderAdresLink = pagina.voegNieuwAdresToe(false);
        ;
        pagina.vulAdresMaximaal(jsonAdres, "2345AB", "23");
        assertEquals(2, pagina.getAdressen().size());
        klikEnWacht(verwijderAdresLink);
        assertEquals(1, pagina.getAdressen().size());

        pagina.opslaan();
        assertTrue(driver.getCurrentUrl().endsWith("#lijstBedrijven"));
        assertEquals("De gegevens zijn opgeslagen", pagina.leesmelding());

        verify(getRequestedFor(urlEqualTo("/dejonge/rest/medewerker/bedrijf/lees")));
        verify(postRequestedFor(urlEqualTo("/dejonge/rest/medewerker/bedrijf/opslaan")));
    }
}
