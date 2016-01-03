package nl.dias.it.schermen.beherenrelatie;

import nl.dias.it.schermen.IndexPagina;
import nl.lakedigital.djfc.commons.json.JsonAdres;
import org.joda.time.LocalDate;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.List;

import static nl.dias.it.Hulp.*;
import static nl.dias.it.StringGeneratieUtil.*;
import static org.junit.Assert.assertEquals;

public class BeherenRelatie extends IndexPagina {
    public static final String URL = "beherenRelatie/0";

    //openstaande taken
    @FindBy(className = "takenKolomEersteKolom")
    private WebElement soortTaak;
    @FindBy(className = "takenKolomTweedeKolom")
    private WebElement datumTijdCreatie;
    @FindBy(className = "takenKolomDerdeKolom")
    private WebElement status;

    //Relatie
    @FindBy(id = "voornaam")
    private WebElement voornaam;
    @FindBy(id = "roepnaam")
    private WebElement roepnaam;
    @FindBy(id = "tussenvoegsel")
    private WebElement tussenvoegsel;
    @FindBy(id = "achternaam")
    private WebElement achternaam;
    @FindBy(id = "bsn")
    private WebElement bsn;
    @FindBy(id = "geboorteDatum")
    private WebElement geboorteDatum;
    @FindBy(id = "overlijdensdatum")
    private WebElement overlijdensdatum;
    @FindBy(id = "geslacht")
    private WebElement geslacht;
    @FindBy(id = "burgerlijkeStaat")
    private WebElement burgerlijkeStaat;
    @FindBy(id = "emailadres")
    private WebElement emailadres;
    @FindBy(id = "mailtolink")
    private WebElement mailtolink;

    //Adressen
    @FindBy(id = "voegAdresToe")
    private WebElement voegAdresToe;
    @FindBy(id = "verwijderAdres")
    private List<WebElement> verwijderAdres;
    @FindBy(id = "soortadres")
    private WebElement soortadres;
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

    //Rekeningen
    @FindBy(id = "voegRekeningToe")
    private WebElement voegRekeningToe;
    @FindBy(id = "verwijderRekening")
    private List<WebElement> verwijderRekening;
    @FindBy(id = "rekeningnummernummer")
    private List<WebElement> rekeningnummernummer;
    @FindBy(id = "bic")
    private List<WebElement> bic;

    //Telefoonnummers
    @FindBy(id = "voegTelefoonNummerToe")
    private WebElement voegTelefoonNummerToe;
    @FindBy(id = "verwijderTelefoonNummer")
    private List<WebElement> verwijderTelefoonNummer;
    @FindBy(id = "telnummer")
    private List<WebElement> telefoonnummer;
    @FindBy(id = "soorttelnummer")
    private List<WebElement> soorttelnummer;
    @FindBy(id = "telefoonomschrijving")
    private List<WebElement> telefoonomschrijving;

    //Opmerkingen
    @FindBy(id = "nieuweOpmerking")
    private WebElement nieuweOpmerking;
    @FindBy(id = "opslaanOpmerking")
    private WebElement opslaanOpmerking;

    @FindBy(id = "tekst1")
    private WebElement tekst1;

    @FindBy(id = "opslaanRelatie")
    private WebElement opslaanRelatie;

    public int voegAdresToe() {
        klikEnWacht(voegAdresToe);
        wachtFf();

        return postcode.size() - 1;
    }

    public void vulAdres(int index, JsonAdres jsonAdres, String postcodeKort, String postcodeLang, String huisnummerWaarde) {
        //eerst dummy
        vulVeld(postcode.get(index), postcodeKort);
        vulVeld(huisnummer.get(index), huisnummerWaarde);

        controleerVeld(postcode.get(index), postcodeLang);
        controleerVeld(straat.get(index), jsonAdres.getStraat());
        controleerVeld(plaats.get(index), jsonAdres.getPlaats());
        vulVeld(toevoeging.get(index), genereerRandomString(toevoeging.get(index)));
        vulVeld(straat.get(index), genereerRandomString(straat.get(index)));
        vulVeld(plaats.get(index), genereerRandomString(plaats.get(index)));
        selecteerUitSelectieBox(soortadres, "RISICOADRES");
    }

    public void verwijderAdres(int index, int aantalVoor, int aantalNa) {
        assertEquals(aantalVoor, postcode.size());
        klikEnWacht(verwijderAdres.get(index));
        assertEquals(aantalNa, postcode.size());
    }

    public int voegRekeningToe() {
        klikEnWacht(voegRekeningToe);
        wachtFf();
        return rekeningnummernummer.size() - 1;
    }

    public void vulRekening(int index, String rekeningLang, String rekeningKort) {
        vulVeld(rekeningnummernummer.get(index), rekeningKort);
        controleerVeld(rekeningnummernummer.get(index), rekeningLang);
        vulVeld(bic.get(index), genereerRandomString(bic.get(index)));
    }

    public void verwijderRekening(int index, int aantalVoor, int aantalNa) {
        assertEquals(aantalVoor, rekeningnummernummer.size());
        klikEnWacht(verwijderRekening.get(index));
        wachtFf();
        assertEquals(aantalNa, rekeningnummernummer.size());
    }

    public int voegTelefoonnummerToe() {
        klikEnWacht(voegTelefoonNummerToe);
        wachtFf();
        return telefoonnummer.size() - 1;
    }

    public void vulTelefoonnummer(int index, String nummerKort, String nummerLang) {
        vulVeld(telefoonnummer.get(index), nummerKort);
        controleerVeld(telefoonnummer.get(index), nummerLang);
        selecteerUitSelectieBox(soorttelnummer.get(index), "VAST");
        vulVeld(telefoonomschrijving.get(index), genereerRandomString(telefoonomschrijving.get(index)));
    }

    public void verwijderTelefoonnummer(int index, int aantalVoor, int aantalNa) {
        assertEquals(aantalVoor, telefoonnummer.size());
        klikEnWacht(verwijderTelefoonNummer.get(index));
        wachtFf();
        assertEquals(aantalNa, telefoonnummer.size());
    }

    public String vulMinimaal() {
        vulVeld(voornaam, genereerRandomString(voornaam));
        String achternaam = genereerRandomString(this.achternaam);
        vulVeld(this.achternaam, achternaam);

        return achternaam;
    }

    public String vulMaximaal() {
        vulVeld(roepnaam, genereerRandomString(roepnaam));
        vulVeld(tussenvoegsel, genereerRandomString(tussenvoegsel));
        vulVeld(bsn, genereerRandomString(bsn));
        LocalDate geboorteDatumWaarde = genereerDatum(null);
        vulVeld(geboorteDatum, geboorteDatumWaarde.toString("ddMMyyyy"));
        controleerVeld(geboorteDatum, geboorteDatumWaarde.toString("dd-MM-yyyy"));
        LocalDate overlijdensDatumWaarde = genereerDatum(geboorteDatumWaarde);
        vulVeld(overlijdensdatum, overlijdensDatumWaarde.toString("ddMMyyyy"));
        controleerVeld(overlijdensdatum, overlijdensDatumWaarde.toString("dd-MM-yyyy"));
        selecteerUitSelectieBox(geslacht, "Man");
        selecteerUitSelectieBox(burgerlijkeStaat, "Samenlevingscontract");
        String mailadres = genereerEmailAdres(genereerVoornaam(), genereerTussenvoegsel(), genereerAchternaam());
        vulVeld(

                emailadres, mailadres);

        controleerVeld(mailtolink, mailadres);


        return vulMinimaal();
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

    public void opslaan() {
        klikEnWacht(opslaanRelatie);
    }
}

