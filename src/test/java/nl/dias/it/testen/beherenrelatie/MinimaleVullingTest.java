package nl.dias.it.testen.beherenrelatie;

import nl.dias.it.schermen.beherenrelatie.BeherenRelatie;
import nl.dias.it.testen.AbstractITest;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

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
        new nl.dias.it.wiremockmapping.BeherenRelatie(wireMockRule);
    }
}
