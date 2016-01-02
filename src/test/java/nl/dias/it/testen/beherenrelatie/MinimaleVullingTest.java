package nl.dias.it.testen.beherenrelatie;

import nl.dias.it.schermen.beherenrelatie.BeherenRelatie;
import nl.dias.it.testen.AbstractITest;
import nl.lakedigital.djfc.commons.json.JsonFoutmelding;
import nl.lakedigital.djfc.commons.json.JsonLijstRelaties;
import nl.lakedigital.djfc.commons.json.JsonRelatie;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

import java.util.ArrayList;

import static nl.dias.it.Hulp.naarAdres;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class MinimaleVullingTest extends AbstractITest {
    @Override
    protected void voeruitTest() throws Exception {
        BeherenRelatie pagina = PageFactory.initElements(driver, BeherenRelatie.class);
        naarAdres(driver, BASIS_URL + pagina.URL);

        pagina.opslaan();

        assertEquals(5, pagina.getKnockoutMelding().size());
        int gevuld = 0;
        for (WebElement melding : pagina.getKnockoutMelding()) {
            if (melding.getText() != null && !"".equals(melding.getText())) {
                gevuld++;
            }
        }
        assertEquals(2, gevuld);

        String achternaam = pagina.vulMinimaal();

        pagina.opslaan();
        assertTrue(driver.getCurrentUrl().endsWith("lijstRelaties/" + achternaam));
    }

    @Override
    protected void doeExpects() {
        expectGet("/dejonge/rest/medewerker/gebruiker/lees", gson.toJson(new JsonRelatie()));
        expectGet("/dejonge/rest/medewerker/taak/alleOpenTakenVoorRelatie", gson.toJson(new ArrayList<>()));
        expectPost("/dejonge/rest/medewerker/gebruiker/opslaan", gson.toJson(new JsonFoutmelding()));
        expectGet("/dejonge/rest/medewerker/gebruiker/zoekOpNaamAdresOfPolisNummer", gson.toJson(new JsonLijstRelaties()));
    }
}
