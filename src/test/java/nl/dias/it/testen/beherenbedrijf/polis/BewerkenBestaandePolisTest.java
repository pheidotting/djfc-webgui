package nl.dias.it.testen.beherenbedrijf.polis;

import nl.dias.it.StringGeneratieUtil;
import nl.dias.it.schermen.polis.BeherenPolisInvoer;
import nl.dias.it.testen.AbstractITest;
import nl.lakedigital.djfc.commons.json.JsonPolis;
import org.joda.time.LocalDate;
import org.openqa.selenium.support.PageFactory;

import java.util.ArrayList;
import java.util.List;

import static nl.dias.it.Hulp.naarAdres;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class BewerkenBestaandePolisTest extends AbstractITest {
    LocalDate ingangsDatum = StringGeneratieUtil.genereerDatum(null);

    @Override
    protected void voeruitTest() throws Exception {
        BeherenPolisInvoer pagina = PageFactory.initElements(driver, BeherenPolisInvoer.class);
        naarAdres(driver, BASIS_URL + pagina.URL.replace("/0", "/1"));

        pagina.controleerIngangsdatumEnStatus(ingangsDatum.toString("dd-MM-yyyy"), "Geschorst");

        pagina.vulMaximaal();

        //opmerking opslaan
        String opmerkingTekst = pagina.opslaanNieuweOpmerking();
        assertEquals(opmerkingTekst, pagina.getTekst1());

        pagina.opslaan();
        assertTrue(driver.getCurrentUrl().endsWith("#beherenBedrijf/5/polissen"));
        assertEquals("De gegevens zijn opgeslagen", pagina.leesmelding());
    }

    @Override
    protected void doeExpects() {
        JsonPolis jsonPolis = new JsonPolis();
        jsonPolis.setIngangsDatum(ingangsDatum.toString("yyyy-MM-dd"));
        jsonPolis.setStatus("Geschorst");

        expectGet("/dejonge/rest/medewerker/polis/lees", gson.toJson(jsonPolis));

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

        expectOpmerkingOpslaan();

        expectGet("/dejonge/rest/medewerker/polis/lijstBijBedrijf", gson.toJson(lijst));

    }
}
