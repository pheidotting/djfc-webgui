package nl.dias.it;

import com.github.tomakehurst.wiremock.junit.WireMockRule;
import com.google.gson.Gson;
import nl.dias.commons.test.TestCase;
import nl.dias.it.schermen.BeherenBedrijf;
import nl.lakedigital.djfc.gui.IngelogdeGebruiker;
import nl.lakedigital.djfc.gui.JsonAdres;
import nl.lakedigital.djfc.gui.JsonBedrijf;
import nl.lakedigital.djfc.gui.JsonFoutmelding;
import org.junit.Rule;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.PageFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static nl.dias.commons.test.TestCase.Testcase.*;
import static nl.dias.it.Hulp.*;
import static org.junit.Assert.*;

public class BeherenBedrijfSchermTest {
    private final static Logger LOGGER = LoggerFactory.getLogger(BeherenBedrijfSchermTest.class);

    private BeherenBedrijf beherenBedrijf;

    private final String BASIS_URL = "http://localhost:7072/dejonge/index.html#";


    @Rule
    public WireMockRule wireMockRule = new WireMockRule(8888);
    private Gson gson = new Gson();

    @Test
    public void go() throws Exception {
        LOGGER.info("start test");
        IngelogdeGebruiker ingelogdeGebruiker = new IngelogdeGebruiker();
        ingelogdeGebruiker.setGebruikersnaam("Jax Teller");
        ingelogdeGebruiker.setId("34");
        ingelogdeGebruiker.setKantoor("Teller Morrow");

        JsonAdres jsonAdres = new JsonAdres();
        jsonAdres.setStraat("straat");
        jsonAdres.setHuisnummer(1L);
        jsonAdres.setPlaats("plaats");
        jsonAdres.setPostcode("1234AA");
        jsonAdres.setToevoeging("toevoeging");

        stubFor(get(urlEqualTo("/dejonge/rest/medewerker/bedrijf/lees")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new JsonBedrijf()))));
        stubFor(get(urlEqualTo("/dejonge/rest/medewerker/overig/ophalenAdresOpPostcode")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(jsonAdres))));
        stubFor(post(urlEqualTo("/dejonge/rest/authorisatie/log4j/log4javascript")).willReturn(aResponse().withStatus(200)));
        stubFor(post(urlEqualTo("/dejonge/rest/medewerker/bedrijf/opslaan")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new JsonFoutmelding()))));

        //        String phantomJsPath=      "//Users//patrickheidotting//Downloads//phantom//bin/phantomjs";
        WebDriver driver = new FirefoxDriver();
        //        DesiredCapabilities caps = new DesiredCapabilities();
        //        caps.setJavascriptEnabled(true);
        //        caps.setCapability(PhantomJSDriverService.PHANTOMJS_EXECUTABLE_PATH_PROPERTY, phantomJsPath);
        //        WebDriver driver=new PhantomJSDriver(caps);

        driver.get(BASIS_URL + beherenBedrijf.URL);
        wachtFf();
        beherenBedrijf = PageFactory.initElements(driver, BeherenBedrijf.class);

        beherenBedrijf.vulMaximaal();

        //DJFC-150
        @TestCase(TESTCASE = DJFC150) WebElement nulZesTelefoonnummer = beherenBedrijf.voegNieuweTelefoonNummerToe();
        beherenBedrijf.vulTelefoonnummerMaximaal();
        vulVeld(nulZesTelefoonnummer, "0612345678");
        wachtFf();
        assertEquals(getText(nulZesTelefoonnummer), "06 - 12 34 56 78");

        //DJFC-151
        @TestCase(TESTCASE = DJFC151) WebElement vierCijferigNetNummerTelefoonnummer = beherenBedrijf.voegNieuweTelefoonNummerToe();
        WebElement verwijderTelefoonnummerLink = beherenBedrijf.laatsteTelefoonnummerVerwijderLink();
        beherenBedrijf.vulTelefoonnummerMaximaal();
        vulVeld(vierCijferigNetNummerTelefoonnummer, "0591123456");
        wachtFf();
        assertEquals(getText(vierCijferigNetNummerTelefoonnummer), "0591 - 12 34 56");

        //DJFC-152
        @TestCase(TESTCASE = DJFC152) WebElement drieCijferigNetNummerTelefoonnummer = beherenBedrijf.voegNieuweTelefoonNummerToe();
        beherenBedrijf.vulTelefoonnummerMaximaal();
        vulVeld(drieCijferigNetNummerTelefoonnummer, "0531234567");
        wachtFf();
        assertEquals(getText(drieCijferigNetNummerTelefoonnummer), "053 - 123 45 67");

        //Onderstaand checkt of het 3 verschillende telefoonnummers zijn, dus : DJFC-153
        assertFalse(nulZesTelefoonnummer.equals(vierCijferigNetNummerTelefoonnummer));
        assertFalse(nulZesTelefoonnummer.equals(drieCijferigNetNummerTelefoonnummer));
        assertFalse(vierCijferigNetNummerTelefoonnummer.equals(drieCijferigNetNummerTelefoonnummer));

        @TestCase(TESTCASE = DJFC155) WebElement postcode = beherenBedrijf.voegNieuwAdresToe(true);
        ;
        beherenBedrijf.vulAdresMaximaal(jsonAdres, "1234AA", "1");
        //DJFC-156
        assertEquals("1234 AA", getText(postcode));

        @TestCase(TESTCASE = DJFC157) WebElement cp = beherenBedrijf.voegNieuwContactpersoonToe();
        ;
        beherenBedrijf.vulContactPersoon();
        assertNotNull(cp);

        @TestCase(TESTCASE = DJFC158) WebElement telefoonnummerBijCP = beherenBedrijf.voegTelefoonNummerToeBijContactpersoon();
        beherenBedrijf.vulTelefoonnummerMaximaal();
        vulVeld(telefoonnummerBijCP, "0698765432");
        assertEquals("06 - 98 76 54 32", getText(telefoonnummerBijCP));

        //DJFC-159
        assertEquals(4, beherenBedrijf.getTelefoonnummers().size());
        klikEnWacht(verwijderTelefoonnummerLink);
        assertEquals(3, beherenBedrijf.getTelefoonnummers().size());

        @TestCase(TESTCASE = DJFC161) WebElement cp2 = beherenBedrijf.voegNieuwContactpersoonToe();
        ;
        WebElement cp2Verwijder = beherenBedrijf.vulContactPersoon();
        assertNotNull(cp2);
        WebElement telefoonnummerBijCP2 = beherenBedrijf.voegTelefoonNummerToeBijContactpersoon();
        beherenBedrijf.vulTelefoonnummerMaximaal();
        WebElement telefoonnummerBijCP2Verwijder = beherenBedrijf.laatsteTelefoonnummerVerwijderLink();
        vulVeld(telefoonnummerBijCP, "0698765433");
        assertEquals("06 - 98 76 54 33", getText(telefoonnummerBijCP));

        //DJFC-162
        assertEquals(4, beherenBedrijf.getTelefoonnummers().size());
        klikEnWacht(telefoonnummerBijCP2Verwijder);
        assertEquals(3, beherenBedrijf.getTelefoonnummers().size());

        assertEquals(2, beherenBedrijf.getContactpersonen().size());
        klikEnWacht(cp2Verwijder);
        assertEquals(1, beherenBedrijf.getContactpersonen().size());

        @TestCase(TESTCASE = DJFC160) WebElement verwijderAdresLink = beherenBedrijf.voegNieuwAdresToe(false);
        ;
        beherenBedrijf.vulAdresMaximaal(jsonAdres, "2345AB", "23");
        assertEquals(2, beherenBedrijf.getAdressen().size());
        klikEnWacht(verwijderAdresLink);
        assertEquals(1, beherenBedrijf.getAdressen().size());

        beherenBedrijf.opslaan();
        assertTrue(driver.getCurrentUrl().endsWith("#lijstBedrijven"));
        assertEquals("De gegevens zijn opgeslagen", beherenBedrijf.leesmelding());

        driver.quit();

        verify(getRequestedFor(urlEqualTo("/dejonge/rest/medewerker/bedrijf/lees")));
        verify(postRequestedFor(urlEqualTo("/dejonge/rest/medewerker/bedrijf/opslaan")));
    }
}
