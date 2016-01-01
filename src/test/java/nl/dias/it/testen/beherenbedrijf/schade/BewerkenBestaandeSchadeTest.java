package nl.dias.it.testen.beherenbedrijf.schade;

import com.beust.jcommander.internal.Lists;
import nl.dias.it.schermen.schade.SchadeInvoer;
import nl.dias.it.testen.AbstractITest;
import nl.lakedigital.djfc.commons.json.JsonFoutmelding;
import nl.lakedigital.djfc.commons.json.JsonPolis;
import nl.lakedigital.djfc.commons.json.JsonSchade;
import org.openqa.selenium.support.PageFactory;

import java.util.ArrayList;
import java.util.List;

import static nl.dias.it.Hulp.naarAdres;
import static nl.dias.it.StringGeneratieUtil.genereerRandomString;
import static nl.dias.it.StringGeneratieUtil.randomGetals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class BewerkenBestaandeSchadeTest extends AbstractITest {
    private JsonSchade jsonSchade;

    @Override
    protected void voeruitTest() throws Exception {
        SchadeInvoer pagina = PageFactory.initElements(driver, SchadeInvoer.class);
        naarAdres(driver, BASIS_URL + pagina.URL.replace("/0", "/4"));

        //        pagina.vulMaximaal();

        String opmerkingTekst = pagina.opslaanNieuweOpmerking();
        assertEquals(opmerkingTekst, pagina.getTekst1());

        pagina.opslaan();
        assertEquals("De gegevens zijn opgeslagen", pagina.leesmelding());
        assertTrue(driver.getCurrentUrl().endsWith("/schades"));
    }

    @Override
    protected void doeExpects() {
        JsonPolis jsonPolis1 = new JsonPolis();
        jsonPolis1.setSoort("Auto");
        jsonPolis1.setPolisNummer("polisnummer1");
        JsonPolis jsonPolis2 = new JsonPolis();
        jsonPolis2.setSoort("Motor");
        jsonPolis2.setPolisNummer("polisnummer2");

        jsonSchade = new JsonSchade();
        jsonSchade.setId(5L);
        jsonSchade.setBedrijf(4L);
        jsonSchade.setSchadeNummerMaatschappij(genereerRandomString(2500));
        jsonSchade.setSchadeNummerTussenPersoon(genereerRandomString(2500));
        jsonSchade.setSoortSchade(genereerRandomString(2500));
        jsonSchade.setLocatie(genereerRandomString(2500));
        jsonSchade.setStatusSchade("Status2");
        jsonSchade.setDatumTijdSchade("03-04-2015 12:34");
        jsonSchade.setDatumTijdMelding("01-05-2014 09:12");
        jsonSchade.setDatumAfgehandeld("31-01-2016");
        jsonSchade.setEigenRisico(String.valueOf(randomGetals(2000)));
        jsonSchade.setOmschrijving(genereerRandomString(2500));
        jsonSchade.setPolis(jsonPolis2.getSoort() + " (" + jsonPolis2.getPolisNummer() + ")");

        expectGet("/dejonge/rest/medewerker/schade/lees", gson.toJson(jsonSchade));
        expectPost("/dejonge/rest/medewerker/schade/opslaan", gson.toJson(new JsonFoutmelding()));
        expectGet("/dejonge/rest/medewerker/polis/lijstBijBedrijf", gson.toJson(Lists.newArrayList(jsonPolis1, jsonPolis2)));
        expectGet("/dejonge/rest/medewerker/overig/lijstStatusSchade", gson.toJson(Lists.newArrayList("Status1", "Status2")));
        expectOpmerkingOpslaan();

        List<JsonSchade> schades = new ArrayList<>();

        expectGet("/dejonge/rest/medewerker/schade/lijstBijBedrijf", gson.toJson(schades));

    }
}
