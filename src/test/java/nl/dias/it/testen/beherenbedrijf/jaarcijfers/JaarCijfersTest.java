package nl.dias.it.testen.beherenbedrijf.jaarcijfers;

import nl.dias.it.schermen.beherenbedrijf.jaarcijfers.LijstJaarCijfers;
import nl.dias.it.testen.AbstractITest;
import nl.lakedigital.djfc.commons.json.JsonJaarCijfers;
import nl.lakedigital.djfc.commons.json.JsonOpmerking;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static nl.dias.it.Hulp.naarAdres;
import static nl.dias.it.StringGeneratieUtil.genereerRandomString;

public class JaarCijfersTest extends AbstractITest {
    private JsonOpmerking jsonOpmerking1;
    private JsonOpmerking jsonOpmerking2;
    private JsonJaarCijfers jaarCijfers2014;
    private JsonJaarCijfers jaarCijfers2015;

    @Override
    protected void voeruitTest() throws Exception {
        LijstJaarCijfers pagina = PageFactory.initElements(driver, LijstJaarCijfers.class);
        naarAdres(driver, BASIS_URL + pagina.URL);

        pagina.controleer(newArrayList(jaarCijfers2014, jaarCijfers2015), 2015L);
    }

    @Override
    protected void doeExpects() {
        jaarCijfers2014 = new JsonJaarCijfers();
        jaarCijfers2014.setJaar(2014L);
        jaarCijfers2014.setId(1L);
        jaarCijfers2015 = new JsonJaarCijfers();
        jaarCijfers2015.setJaar(2015L);
        jaarCijfers2015.setId(2L);

        jsonOpmerking1 = new JsonOpmerking();
        jsonOpmerking1.setId(1L);
        jsonOpmerking1.setMedewerker("Hannibal Lecter");
        jsonOpmerking1.setTijd("Tijdstip1");
        jsonOpmerking1.setOpmerking(genereerRandomString(4000));
        jsonOpmerking2 = new JsonOpmerking();
        jsonOpmerking2.setId(2L);
        jsonOpmerking2.setMedewerker("Will Graham");
        jsonOpmerking2.setTijd("Tijdstip2");
        jsonOpmerking2.setOpmerking(genereerRandomString(4000));

        jaarCijfers2015.getOpmerkingen().add(jsonOpmerking1);
        jaarCijfers2015.getOpmerkingen().add(jsonOpmerking2);

        List<JsonJaarCijfers> jaarCijfers = newArrayList(jaarCijfers2014, jaarCijfers2015);

        expectGet("/dejonge/rest/medewerker/jaarcijfers/lijst", gson.toJson(jaarCijfers));
        expectPost("/dejonge/rest/medewerker/opmerking/opslaan", "3");
    }
}
