package nl.dias.it;

import com.github.tomakehurst.wiremock.junit.WireMockRule;
import com.google.gson.Gson;
import nl.dias.it.schermen.InlogScherm;
import nl.lakedigital.djfc.gui.IngelogdeGebruiker;
import org.junit.Rule;
import org.junit.Test;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.server.SeleniumServer;

import java.net.URL;
import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class BeherenBedrijfSchermTest {
    private SeleniumServer seleniumServer;
    private WebDriver driver;
    private StringGeneratieUtil stringGeneratieUtil;
    // schermen
    private InlogScherm inlogScherm;

    private final String BASIS_URL = "http://localhost:7072/dejonge/index.html#";

    @Rule
    public WireMockRule wireMockRule = new WireMockRule(8080);
private Gson gson=new Gson();
//
//
//    /dejonge/rest/authorisatie/authorisatie/log4javascript
//    /dejonge/rest/medewerker/gebruiker/zoekOpNaamAdresOfPolisNummer

    @Test
    public void go() throws Exception {
        IngelogdeGebruiker ingelogdeGebruiker=new IngelogdeGebruiker();
        ingelogdeGebruiker.setGebruikersnaam("Jax Teller");ingelogdeGebruiker.setId("34");ingelogdeGebruiker.setKantoor("Teller Morrow");

        stubFor(get(urlEqualTo("/dejonge/rest/authorisatie/authorisatie/log4javascript")).willReturn(aResponse().withStatus(200)));
        stubFor(get(urlEqualTo("/dejonge/rest/authorisatie/authorisatie/ingelogdeGebruiker")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(ingelogdeGebruiker))));
//        stubFor(get(urlEqualTo("/dejonge/rest/authorisatie/authorisatie/log4javascript")).willReturn(aResponse().withStatus(200)));




//        Thread.sleep(1000000);


        DesiredCapabilities desiredCapabilities=new DesiredCapabilities();
        desiredCapabilities.setBrowserName("chrome");
        desiredCapabilities.setPlatform(Platform.MAC);

                driver =  new FirefoxDriver(desiredCapabilities);
Hulp.naarAdres(driver,BASIS_URL+"beherenBedrijf");

                Thread.sleep(100000);


        verify(getRequestedFor(urlEqualTo("/dejonge/rest/authorisatie/authorisatie/ingelogdeGebruiker")));
    }
}
