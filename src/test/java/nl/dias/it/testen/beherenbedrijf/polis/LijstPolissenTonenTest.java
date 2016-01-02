package nl.dias.it.testen.beherenbedrijf.polis;

import com.beust.jcommander.internal.Lists;
import nl.dias.it.schermen.beherenbedrijf.polis.LijstPolissen;
import nl.dias.it.testen.AbstractITest;
import nl.lakedigital.djfc.commons.json.JsonPolis;
import org.openqa.selenium.support.PageFactory;

import java.util.ArrayList;
import java.util.List;

import static nl.dias.it.Hulp.naarAdres;

public class LijstPolissenTonenTest extends AbstractITest {
    private List<JsonPolis> polissen;

    @Override
    protected void voeruitTest() throws Exception {
        LijstPolissen pagina = PageFactory.initElements(driver, LijstPolissen.class);
        naarAdres(driver, BASIS_URL + pagina.URL);

        pagina.controleer(polissen);
    }

    @Override
    protected void doeExpects() {
        JsonPolis jsonPolis1 = new JsonPolis();
        jsonPolis1.setPolisNummer("aabbccdd");
        jsonPolis1.setSoort("Auto");
        jsonPolis1.setStatus("Status1");
        jsonPolis1.setKenmerk("Kenmerk1");
        jsonPolis1.setId(1L);
        jsonPolis1.setIdDiv("collapsable1");
        jsonPolis1.setIngangsDatum("2012-02-01");
        jsonPolis1.setEindDatum("2013-03-02");
        jsonPolis1.setWijzigingsDatum("2014-04-02");
        jsonPolis1.setProlongatieDatum("2015-05-04");
        jsonPolis1.setPremie("234,0");
        jsonPolis1.setMaatschappij("maatschappij1");
        jsonPolis1.setBetaalfrequentie("Kwartaal");
        jsonPolis1.setOmschrijvingVerzekering("Omschrijving");

        JsonPolis jsonPolis2 = new JsonPolis();
        jsonPolis2.setPolisNummer("bbccddee");
        jsonPolis2.setSoort("Onzin");
        jsonPolis2.setStatus("Status2");
        jsonPolis2.setKenmerk("Kenmerk2");
        jsonPolis2.setId(2L);
        jsonPolis2.setIdDiv("collapsable2");
        jsonPolis2.setIngangsDatum("2012-03-02");
        jsonPolis2.setEindDatum("2013-04-03");
        jsonPolis2.setWijzigingsDatum("2014-05-04");
        jsonPolis2.setProlongatieDatum("2015-06-05");
        jsonPolis2.setPremie("2345,1");
        jsonPolis2.setMaatschappij("maatschappij2");
        jsonPolis2.setBetaalfrequentie("Jaar");
        jsonPolis2.setOmschrijvingVerzekering("Ook een mschrijving");

        JsonPolis jsonPolis3 = new JsonPolis();
        jsonPolis3.setPolisNummer("ccddeeff");
        jsonPolis3.setSoort("Verzekering");
        jsonPolis3.setStatus("Status3");
        jsonPolis3.setKenmerk("Kenmerk2");
        jsonPolis3.setId(3L);
        jsonPolis3.setIdDiv("collapsable2");
        jsonPolis3.setIngangsDatum("2012-03-02");
        jsonPolis3.setEindDatum("2013-04-03");
        jsonPolis3.setWijzigingsDatum("2014-05-04");
        jsonPolis3.setProlongatieDatum("2015-06-05");
        jsonPolis3.setPremie("1,01");
        jsonPolis3.setMaatschappij("maatschappij3");
        jsonPolis3.setBetaalfrequentie("Jaar");
        jsonPolis3.setOmschrijvingVerzekering("Ook een mschrijving");

        polissen = Lists.newArrayList(jsonPolis1, jsonPolis2, jsonPolis3);

        expectGet("/dejonge/rest/medewerker/polis/lijstBijBedrijf", gson.toJson(polissen));

        List<String> maatschappijen = new ArrayList<>();
        maatschappijen.add("maatschappij1");
        maatschappijen.add("maatschappij2");
        maatschappijen.add("maatschappij3");

        expectGet("/dejonge/rest/medewerker/overig/lijstVerzekeringsMaatschappijen", gson.toJson(maatschappijen));
    }
}
