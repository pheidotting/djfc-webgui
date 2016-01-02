package nl.dias.it.testen.beherenbedrijf.schade;

import nl.dias.it.schermen.schade.LijstSchades;
import nl.dias.it.testen.AbstractITest;
import nl.lakedigital.djfc.commons.json.JsonOpmerking;
import nl.lakedigital.djfc.commons.json.JsonSchade;
import org.openqa.selenium.support.PageFactory;

import static com.beust.jcommander.internal.Lists.newArrayList;
import static nl.dias.it.Hulp.naarAdres;

public class LijstSchadesTest extends AbstractITest {
    private JsonSchade jsonSchade1;

    @Override
    protected void voeruitTest() throws Exception {
        LijstSchades pagina = PageFactory.initElements(driver, LijstSchades.class);
        naarAdres(driver, BASIS_URL + pagina.URL);

        pagina.controleer(newArrayList(jsonSchade1));

    }

    @Override
    protected void doeExpects() {
        jsonSchade1 = new JsonSchade();
        jsonSchade1.setSoortSchade("soortSchade");
        jsonSchade1.setSchadeNummerMaatschappij("123456789");
        jsonSchade1.setId(1L);
        jsonSchade1.setPolis("polis1");
        jsonSchade1.setDatumAfgehandeld("01-02-2012");
        jsonSchade1.setDatumTijdMelding("02-03-2013 08:33");
        jsonSchade1.setDatumTijdSchade("03-04-2014 12:12");
        jsonSchade1.setEigenRisico("123,45");
        jsonSchade1.setLocatie("locatie1");
        jsonSchade1.setOmschrijving("omschrijving");
        jsonSchade1.setSchadeNummerTussenPersoon("schadeNummerTussenPersoon");
        jsonSchade1.setStatusSchade("status1");

        JsonOpmerking jsonOpmerking = new JsonOpmerking();
        jsonOpmerking.setTijd("tijd");
        jsonOpmerking.setMedewerker("Hannibal Lecter");
        jsonOpmerking.setOpmerking("opmerking");
        jsonSchade1.getOpmerkingen().add(jsonOpmerking);

        expectGet("/dejonge/rest/medewerker/schade/lijstBijBedrijf", gson.toJson(newArrayList(jsonSchade1)));


    }
}
