package nl.dias.it.testen.beherenbedrijf;

import nl.dias.it.schermen.beherenbedrijf.BeherenBedrijf;
import nl.dias.it.testen.AbstractITest;
import nl.dias.it.wiremockmapping.BeherenBedrijfBestaand;
import org.openqa.selenium.support.PageFactory;

import static nl.dias.it.Hulp.naarAdres;
import static org.junit.Assert.assertEquals;

public class BeherenBedrijfSchermBestaandBedrijfTest extends AbstractITest {
    private BeherenBedrijfBestaand beherenBedrijfBestaand;

    @Override
    protected void voeruitTest() throws Exception {
        BeherenBedrijf pagina = PageFactory.initElements(driver, BeherenBedrijf.class);
        naarAdres(driver, BASIS_URL + pagina.URL.replace("/0", "/1"));

        pagina.controleer(beherenBedrijfBestaand.getJsonBedrijf());
        pagina.controleerAdres(beherenBedrijfBestaand.getJsonAdres());
        pagina.controleerContactpersoon(beherenBedrijfBestaand.getJsonContactPersoon());

        //opmerking opslaan
        String opmerkingTekst = pagina.opslaanNieuweOpmerking();
        assertEquals(opmerkingTekst, pagina.getTekst1());

    }

    @Override
    protected void doeExpects() {
        //        jsonBedrijf = new JsonBedrijf();
        //        jsonBedrijf.setNaam("Fa. List & Bedrog");
        //        jsonBedrijf.setcAoVerplichtingen("cao verplichtingen");
        //        jsonBedrijf.setEmail("emailadres");
        //        jsonBedrijf.setHoedanigheid("hoedanigheid");
        //        jsonBedrijf.setInternetadres("Internetadres");
        //        jsonBedrijf.setKvk("kvk nummer");
        //        jsonBedrijf.setRechtsvorm("rechtsvorrum");
        //
        //        JsonAdres jsonAdres = new JsonAdres();
        //        jsonAdres.setPostcode("2345CB");
        //        jsonAdres.setHuisnummer(45L);
        //        jsonAdres.setStraat("straatnaam");
        //        jsonAdres.setPlaats("plaatsnaam");
        //        jsonAdres.setToevoeging("toevoeging");
        //        jsonBedrijf.getAdressen().add(jsonAdres);
        //
        //        JsonContactPersoon jsonContactPersoon = new JsonContactPersoon();
        //        jsonContactPersoon.setAchternaam("jsonContactPersoonAchternaam");
        //        jsonContactPersoon.setEmailadres("jsonContactPersoonEmailadres");
        //        jsonContactPersoon.setFunctie("jsonContactPersoonFunctie");
        //        jsonContactPersoon.setTussenvoegsel("jsonContactPersoonTussenvoegsel");
        //        jsonContactPersoon.setVoornaam("jsonContactPersoonVoornaam");
        //        JsonTelefoonnummer jsonTelefoonnummerBijContactpersoon = new JsonTelefoonnummer();
        //        jsonTelefoonnummerBijContactpersoon.setOmschrijving("jsonTelefoonnummerBijContactpersoonOmschrijving");
        //        jsonTelefoonnummerBijContactpersoon.setSoort("Zakelijk");
        //        jsonTelefoonnummerBijContactpersoon.setTelefoonnummer("0591234567");
        //        jsonContactPersoon.getTelefoonnummers().add(jsonTelefoonnummerBijContactpersoon);
        //        jsonBedrijf.getContactpersonen().add(jsonContactPersoon);
        //
        //        expectGet("/dejonge/rest/medewerker/bedrijf/lees", gson.toJson(jsonBedrijf));
        //        expectOpmerkingOpslaan();
        beherenBedrijfBestaand = new nl.dias.it.wiremockmapping.BeherenBedrijfBestaand(wireMockRule);
    }
}
