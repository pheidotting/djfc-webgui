package nl.dias.it.testen.beherenbedrijf.risicoanalyses;

import nl.dias.it.schermen.risicoanalyses.RisicoAnalyses;
import nl.dias.it.testen.AbstractITest;
import nl.lakedigital.djfc.commons.json.JsonOpmerking;
import nl.lakedigital.djfc.commons.json.JsonRisicoAnalyse;
import org.openqa.selenium.support.PageFactory;

import static nl.dias.it.Hulp.naarAdres;
import static nl.dias.it.Hulp.wachtFf;
import static nl.dias.it.StringGeneratieUtil.genereerRandomString;

public class RisicoAnalysesTest extends AbstractITest {
    private JsonOpmerking jsonOpmerking1;
    private JsonOpmerking jsonOpmerking2;
    private JsonRisicoAnalyse risicoAnalyse;

    @Override
    protected void voeruitTest() throws Exception {
        RisicoAnalyses pagina = PageFactory.initElements(driver, RisicoAnalyses.class);
        naarAdres(driver, BASIS_URL + pagina.URL);

        wachtFf();
        wachtFf();
        wachtFf();
        wachtFf();
        wachtFf();
        wachtFf();

        pagina.controleer(risicoAnalyse);
    }

    @Override
    protected void doeExpects() {
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

        risicoAnalyse = new JsonRisicoAnalyse();
        risicoAnalyse.getOpmerkingen().add(jsonOpmerking1);
        risicoAnalyse.getOpmerkingen().add(jsonOpmerking2);

        expectGet("/dejonge/rest/medewerker/risicoanalyse/lees", gson.toJson(risicoAnalyse));
        expectPost("/dejonge/rest/medewerker/opmerking/opslaan", "3");
    }
}
