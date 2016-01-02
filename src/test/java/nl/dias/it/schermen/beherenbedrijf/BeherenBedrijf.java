package nl.dias.it.schermen.beherenbedrijf;

import nl.dias.it.schermen.IndexPagina;
import nl.lakedigital.djfc.commons.json.JsonAdres;
import nl.lakedigital.djfc.commons.json.JsonBedrijf;
import nl.lakedigital.djfc.commons.json.JsonContactPersoon;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.List;

import static nl.dias.it.Hulp.*;
import static nl.dias.it.StringGeneratieUtil.genereerRandomString;
import static nl.dias.it.StringGeneratieUtil.genereerTelefoonnummers;
import static org.junit.Assert.assertEquals;

public class BeherenBedrijf extends IndexPagina {
    public static final String URL = "beherenBedrijf/0";

    @FindBy(id = "naam")
    private WebElement naam;
    @FindBy(id = "kvk")
    private WebElement kvk;
    @FindBy(id = "rechtsvorm")
    private WebElement rechtsvorm;
    @FindBy(id = "email")
    private WebElement email;
    @FindBy(id = "internetadres")
    private WebElement internetadres;
    @FindBy(id = "hoedanigheid")
    private WebElement hoedanigheid;
    @FindBy(id = "cAoVerplichtingen")
    private WebElement cAoVerplichtingen;

    //Adressen
    @FindBy(id = "voegAdresToe")
    private WebElement voegAdresToe;
    @FindBy(id = "soortadres")
    private List<WebElement> soort;
    @FindBy(id = "verwijderAdres")
    private List<WebElement> verwijderAdres;
    @FindBy(id = "postcode")
    private List<WebElement> postcode;
    @FindBy(id = "huisnummer")
    private List<WebElement> huisnummer;
    @FindBy(id = "toevoeging")
    private List<WebElement> toevoeging;
    @FindBy(id = "straat")
    private List<WebElement> straat;
    @FindBy(id = "plaats")
    private List<WebElement> plaats;

    //Telefoonnummers
    @FindBy(id = "voegTelefoonNummerToe")
    private WebElement voegTelefoonNummerToe;
    @FindBy(id = "telnummer")
    private List<WebElement> telefoonnummer;
    @FindBy(id = "soorttelnummer")
    private List<WebElement> soortTelefoonnummer;
    @FindBy(id = "telefoonomschrijving")
    private List<WebElement> omschrijving;
    @FindBy(id = "verwijderTelefoonNummer")
    private List<WebElement> verwijderTelefoonnummer;

    //Contactpersonen
    @FindBy(id = "voegContactpersoonToe")
    private WebElement voegContactpersoonToe;
    @FindBy(id = "voornaam")
    private List<WebElement> voornaam;
    @FindBy(id = "tussenvoegsel")
    private List<WebElement> tussenvoegsel;
    @FindBy(id = "achternaam")
    private List<WebElement> achternaam;
    @FindBy(id = "emailadres")
    private List<WebElement> emailadres;
    @FindBy(id = "functie")
    private List<WebElement> functie;
    @FindBy(id = "verwijderContactpersoon")
    private List<WebElement> verwijderContactpersoon;
    @FindBy(id = "voegTelefoonNummerToeBijContactpersoon")
    private WebElement voegTelefoonNummerToeBijContactpersoon;

    //Opmerkingen
    @FindBy(id = "nieuweOpmerking")
    private WebElement nieuweOpmerking;
    @FindBy(id = "opslaanOpmerking")
    private WebElement opslaanOpmerking;

    @FindBy(id = "tekst1")
    private WebElement tekst1;

    @FindBy(id = "opslaanBedrijf")
    private WebElement opslaan;
    @FindBy(id = "annuleren")
    private WebElement annuleren;

    public void vulMaximaal() {
        vulVeld(naam, genereerRandomString(naam));
        vulVeld(kvk, genereerRandomString(kvk));
        vulVeld(rechtsvorm, genereerRandomString(rechtsvorm));
        vulVeld(email, genereerRandomString(email));
        vulVeld(internetadres, genereerRandomString(internetadres));
        vulVeld(hoedanigheid, genereerRandomString(hoedanigheid));
        vulVeld(cAoVerplichtingen, genereerRandomString(cAoVerplichtingen));
    }

    public void controleer(JsonBedrijf jsonBedrijf) {
        assertEquals(jsonBedrijf.getNaam(), getText(naam));
        assertEquals(jsonBedrijf.getKvk(), getText(kvk));
        assertEquals(jsonBedrijf.getRechtsvorm(), getText(rechtsvorm));
        assertEquals(jsonBedrijf.getEmail(), getText(email));
        assertEquals(jsonBedrijf.getInternetadres(), getText(internetadres));
        assertEquals(jsonBedrijf.getHoedanigheid(), getText(hoedanigheid));
        assertEquals(jsonBedrijf.getcAoVerplichtingen(), getText(cAoVerplichtingen));
    }

    public void vulNaam() {
        vulVeld(naam, genereerRandomString(naam));
    }

    public void vulTelefoonnummerMaximaal() {
        vulVeld(laatste(telefoonnummer), genereerTelefoonnummers());
        selecteerUitSelectieBox(laatste(soortTelefoonnummer), "Zakelijk");
        vulVeld(laatste(omschrijving), genereerRandomString(laatste(omschrijving)));
    }

    public void vulAdresMaximaal(JsonAdres jsonAdres, String postcodeS, String huisnummerS) {
        selecteerUitSelectieBox(laatste(soort), "Postadres");
        vulVeld(laatste(postcode), postcodeS);
        vulVeld(laatste(huisnummer), huisnummerS);
        if (jsonAdres != null) {
            assertEquals(jsonAdres.getStraat(), getText(laatste(straat)));
            assertEquals(jsonAdres.getPlaats(), getText(laatste(plaats)));
        }
        vulVeld(laatste(toevoeging), genereerRandomString(laatste(toevoeging)));
        vulVeld(laatste(straat), genereerRandomString(laatste(straat)));
        vulVeld(laatste(plaats), genereerRandomString(laatste(plaats)));
    }

    public WebElement vulContactPersoon() {
        vulVeld(laatste(voornaam), genereerRandomString(laatste(voornaam)));
        vulVeld(laatste(tussenvoegsel), genereerRandomString(laatste(tussenvoegsel)));
        vulVeld(laatste(achternaam), genereerRandomString(laatste(achternaam)));
        vulVeld(laatste(emailadres), genereerRandomString(laatste(emailadres)));
        vulVeld(laatste(functie), genereerRandomString(laatste(functie)));

        return laatste(verwijderContactpersoon);
    }

    public void controleerAdres(JsonAdres jsonAdres) {
        String postcodeS = jsonAdres.getPostcode().substring(0, 4) + " " + jsonAdres.getPostcode().substring(4, 6);

        assertEquals(postcodeS, getText(laatste(postcode)));
        assertEquals(jsonAdres.getHuisnummer().toString(), getText(laatste(huisnummer)));
        assertEquals(jsonAdres.getToevoeging(), getText(laatste(toevoeging)));
        assertEquals(jsonAdres.getStraat(), getText(laatste(straat)));
        assertEquals(jsonAdres.getPlaats(), getText(laatste(plaats)));
    }

    public void controleerContactpersoon(JsonContactPersoon jsonContactPersoon) {
        assertEquals(jsonContactPersoon.getAchternaam(), getText(laatste(achternaam)));
        assertEquals(jsonContactPersoon.getTussenvoegsel(), getText(laatste(tussenvoegsel)));
        assertEquals(jsonContactPersoon.getVoornaam(), getText(laatste(voornaam)));
        assertEquals(jsonContactPersoon.getEmailadres(), getText(laatste(emailadres)));
        assertEquals(jsonContactPersoon.getFunctie(), getText(laatste(functie)));
    }

    public WebElement voegNieuweTelefoonNummerToe() {
        klikEnWacht(voegTelefoonNummerToe);

        return laatste(telefoonnummer);
    }

    public WebElement laatsteTelefoonnummerVerwijderLink() {
        return laatste(verwijderTelefoonnummer);
    }

    public List<WebElement> getTelefoonnummers() {
        return telefoonnummer;
    }

    public WebElement voegNieuwAdresToe(boolean postcodeReturnen) {
        klikEnWacht(voegAdresToe);

        if (postcodeReturnen) {
            return laatste(postcode);
        } else {
            return laatste(verwijderAdres);
        }
    }

    public WebElement voegNieuwContactpersoonToe() {
        klikEnWacht(voegContactpersoonToe);

        return laatste(voornaam);
    }

    public List<WebElement> getContactpersonen() {
        return achternaam;
    }

    public List<WebElement> getAdressen() {
        return postcode;
    }

    public WebElement voegTelefoonNummerToeBijContactpersoon() {
        klikEnWacht(voegTelefoonNummerToeBijContactpersoon);

        return laatste(telefoonnummer);
    }

    private WebElement laatste(List<WebElement> webElements) {
        return webElements.get(webElements.size() - 1);
    }

    public void opslaan() {
        klikEnWacht(opslaan);
    }

    public String opslaanNieuweOpmerking() {
        String opmerkingTekst = genereerRandomString(nieuweOpmerking);

        vulVeld(nieuweOpmerking, opmerkingTekst);
        klikEnWacht(opslaanOpmerking);

        wachtFf();

        return opmerkingTekst;
    }

    public String getTekst1() {
        return tekst1.getText();
    }
}
