package nl.dias.it.testen.beherenbedrijf.polis;

import nl.dias.it.schermen.polis.BeherenPolisInvoer;
import nl.dias.it.testen.AbstractITest;
import nl.lakedigital.djfc.commons.json.JsonPolis;
import org.openqa.selenium.support.PageFactory;

import java.util.ArrayList;
import java.util.List;

import static nl.dias.it.Hulp.naarAdres;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class InvoerenNieuwePolisTest extends AbstractITest {
    @Override
    protected void voeruitTest() throws Exception {
        BeherenPolisInvoer pagina = PageFactory.initElements(driver, BeherenPolisInvoer.class);
        naarAdres(driver, BASIS_URL + pagina.URL);

        pagina.vulMaximaal();
        pagina.opslaan();
        assertTrue(driver.getCurrentUrl().endsWith("#beherenBedrijf/5/polissen"));
        assertEquals("De gegevens zijn opgeslagen", pagina.leesmelding());
    }

    @Override
    protected void doeExpects() {
        expectGet("/dejonge/rest/medewerker/polis/lees", gson.toJson(new JsonPolis()));

        List<String> maatschappijen = new ArrayList<>();
        maatschappijen.add("maatschappij1");
        maatschappijen.add("maatschappij2");

        expectGet("/dejonge/rest/medewerker/overig/lijstVerzekeringsMaatschappijen", gson.toJson(maatschappijen));

        List<String> polissen = new ArrayList<>();
        polissen.add("polis1");
        polissen.add("polis2");

        expectGet("/dejonge/rest/medewerker/polis/alleZakelijkePolisSoorten", gson.toJson(polissen));
        expectPost("/dejonge/rest/medewerker/polis/opslaan");

        List<JsonPolis> lijst = new ArrayList<>();

        expectGet("/dejonge/rest/medewerker/polis/lijstBijBedrijf", gson.toJson(lijst));
    }
}
