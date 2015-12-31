package nl.dias.it.testen;

import com.github.tomakehurst.wiremock.junit.WireMockRule;
import com.google.gson.Gson;
import nl.lakedigital.djfc.gui.IngelogdeGebruiker;
import org.junit.After;
import org.junit.Rule;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public abstract class AbstractITest {
    protected final String BASIS_URL = "http://localhost:7072/dejonge/index.html#";

    @Rule
    public WireMockRule wireMockRule = new WireMockRule(8888);
    protected Gson gson = new Gson();
    protected WebDriver driver;

    @Test
    public void standardTest() throws Exception {
        IngelogdeGebruiker ingelogdeGebruiker = new IngelogdeGebruiker();
        ingelogdeGebruiker.setGebruikersnaam("Jax Teller");
        ingelogdeGebruiker.setId("34");
        ingelogdeGebruiker.setKantoor("Teller Morrow");

        expectGet("/dejonge/rest/authorisatie/authorisatie/ingelogdeGebruiker", gson.toJson(ingelogdeGebruiker));
        expectPost("/dejonge/rest/authorisatie/log4j/log4javascript");
        doeExpects();

        driver = getDriver();

        voeruitTest();
    }

    @After
    public void afsluiten() {
        driver.quit();
    }

    protected abstract void voeruitTest() throws Exception;

    protected abstract void doeExpects();


    protected WebDriver getDriver() {
        //        String phantomJsPath=      "//Users//patrickheidotting//Downloads//phantom//bin/phantomjs";
        WebDriver driver = new FirefoxDriver();
        //        DesiredCapabilities caps = new DesiredCapabilities();
        //        caps.setJavascriptEnabled(true);
        //        caps.setCapability(PhantomJSDriverService.PHANTOMJS_EXECUTABLE_PATH_PROPERTY, phantomJsPath);
        //        WebDriver driver=new PhantomJSDriver(caps);

        return driver;
    }

    protected void expectPost(String url) {
        stubFor(post(urlEqualTo(url)).willReturn(aResponse().withStatus(200)));
    }

    protected void expectPost(String url, String response) {
        stubFor(post(urlEqualTo(url)).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(response)));
    }

    protected void expectGet(String url, String response) {
        stubFor(get(urlEqualTo(url)).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(response)));
    }

    protected void expectOpmerkingOpslaan() {
        expectPost("/dejonge/rest/medewerker/opmerking/opslaan", "1");
    }
}
