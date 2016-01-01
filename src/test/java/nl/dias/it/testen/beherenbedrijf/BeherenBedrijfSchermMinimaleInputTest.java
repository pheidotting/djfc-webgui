package nl.dias.it.testen.beherenbedrijf;

import nl.dias.it.schermen.BeherenBedrijf;
import nl.dias.it.testen.AbstractITest;
import nl.lakedigital.djfc.commons.json.JsonBedrijf;
import nl.lakedigital.djfc.commons.json.JsonFoutmelding;
import org.openqa.selenium.support.PageFactory;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static nl.dias.it.Hulp.naarAdres;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class BeherenBedrijfSchermMinimaleInputTest extends AbstractITest {
    @Override
    protected void voeruitTest() throws Exception {
        BeherenBedrijf pagina = PageFactory.initElements(driver, BeherenBedrijf.class);
        naarAdres(driver, BASIS_URL + pagina.URL);
        pagina.opslaan();

        assertEquals(1, pagina.getKnockoutMelding().size());
        assertEquals("Dit veld is verplicht.", pagina.getKnockoutMelding().get(0).getText());

        pagina.vulNaam();
        pagina.opslaan();

        assertTrue(driver.getCurrentUrl().endsWith("#lijstBedrijven"));
        assertEquals("De gegevens zijn opgeslagen", pagina.leesmelding());

        verify(getRequestedFor(urlEqualTo("/dejonge/rest/medewerker/bedrijf/lees")));
        verify(postRequestedFor(urlEqualTo("/dejonge/rest/medewerker/bedrijf/opslaan")));
    }

    @Override
    protected void doeExpects() {
        expectGet("/dejonge/rest/medewerker/bedrijf/lees", gson.toJson(new JsonBedrijf()));
        expectPost("/dejonge/rest/medewerker/bedrijf/opslaan", gson.toJson(new JsonFoutmelding()));
    }

}
