package nl.dias.it.testen.beherenrelatie;

import nl.dias.it.schermen.beherenrelatie.BeherenRelatie;
import nl.dias.it.testen.AbstractITest;
import nl.lakedigital.as.taakbeheer.domein.json.JsonTaak;
import nl.lakedigital.djfc.commons.json.JsonFoutmelding;
import nl.lakedigital.djfc.commons.json.JsonLijstRelaties;
import nl.lakedigital.djfc.commons.json.JsonRelatie;
import org.openqa.selenium.support.PageFactory;

import java.util.ArrayList;
import java.util.List;

import static nl.dias.it.Hulp.naarAdres;
import static nl.dias.it.StringGeneratieUtil.genereerRandomString;

public class BestaandeRelatieTest extends AbstractITest {
    @Override
    protected void voeruitTest() throws Exception {
        BeherenRelatie pagina = PageFactory.initElements(driver, BeherenRelatie.class);
        naarAdres(driver, BASIS_URL + pagina.URL);

        //        pagina.opslaan();
        //
        //        assertEquals(5, pagina.getKnockoutMelding().size());
        //        int gevuld = 0;
        //        for (WebElement melding : pagina.getKnockoutMelding()) {
        //            if (melding.getText() != null && !"".equals(melding.getText())) {
        //                gevuld++;
        //            }
        //        }
        //        assertEquals(2, gevuld);
        //
        //        String achternaam = pagina.vulMinimaal();
        //
        //        pagina.opslaan();
        //        assertTrue(driver.getCurrentUrl().endsWith("lijstRelaties/" + achternaam));
    }

    @Override
    protected void doeExpects() {
        JsonRelatie jsonRelatie = new JsonRelatie();
        jsonRelatie.setAchternaam(genereerRandomString(2500));
        jsonRelatie.setVoornaam(genereerRandomString(2500));
        jsonRelatie.setRoepnaam(genereerRandomString(2500));
        jsonRelatie.setTussenvoegsel(genereerRandomString(2500));
        jsonRelatie.setBsn(genereerRandomString(9));

        List<JsonTaak> taken = new ArrayList<>();
        JsonTaak jsonTaak = new JsonTaak();
        jsonTaak.setSoortTaak("soortTaak");
        jsonTaak.setDatumTijdCreatie("datumTijdCreatie");
        jsonTaak.setStatus("status");
        taken.add(jsonTaak);

        expectGet("/dejonge/rest/medewerker/gebruiker/lees", gson.toJson(jsonRelatie));
        expectGet("/dejonge/rest/medewerker/taak/alleOpenTakenVoorRelatie", gson.toJson(taken));
        expectPost("/dejonge/rest/medewerker/gebruiker/opslaan", gson.toJson(new JsonFoutmelding()));
        expectGet("/dejonge/rest/medewerker/gebruiker/zoekOpNaamAdresOfPolisNummer", gson.toJson(new JsonLijstRelaties()));
    }
}
