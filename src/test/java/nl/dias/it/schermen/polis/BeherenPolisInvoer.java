package nl.dias.it.schermen.polis;

import nl.dias.it.schermen.IndexPagina;
import org.joda.time.LocalDate;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import static nl.dias.it.Hulp.*;
import static nl.dias.it.StringGeneratieUtil.*;
import static org.junit.Assert.assertEquals;


public class BeherenPolisInvoer extends IndexPagina {
    public static final String URL = "beherenBedrijf/5/polis/0";

    @FindBy(id = "verzekeringsMaatschappijen")
    private WebElement verzekeringsMaatschappijen;
    @FindBy(id = "soortVerzekering")
    private WebElement soortVerzekering;
    @FindBy(id = "status")
    private WebElement status;
    @FindBy(id = "polisNummer")
    private WebElement polisNummer;
    @FindBy(id = "kenmerk")
    private WebElement kenmerk;
    @FindBy(id = "dekking")
    private WebElement dekking;
    @FindBy(id = "verzekerdeZaak")
    private WebElement verzekerdeZaak;
    @FindBy(id = "premie")
    private WebElement premie;
    @FindBy(id = "ingangsDatumString")
    private WebElement ingangsDatumString;
    @FindBy(id = "wijzigingsdatumString")
    private WebElement wijzigingsdatumString;
    @FindBy(id = "prolongatiedatumString")
    private WebElement prolongatiedatumString;
    @FindBy(id = "betaalfrequentie")
    private WebElement betaalfrequentie;
    @FindBy(id = "omschrijvingVerzekering")
    private WebElement omschrijvingVerzekering;

    //Opmerkingen
    @FindBy(id = "nieuweOpmerking")
    private WebElement nieuweOpmerking;
    @FindBy(id = "opslaanOpmerking")
    private WebElement opslaanOpmerking;

    @FindBy(id = "tekst1")
    private WebElement tekst1;

    @FindBy(id = "opslaanPolis")
    private WebElement opslaanPolis;

    public void vulMaximaal() {
        selecteerUitSelectieBox(verzekeringsMaatschappijen, "maatschappij2");
        selecteerUitSelectieBox(soortVerzekering, "polis2");
        selecteerUitSelectieBox(status, "Premievrij");
        vulVeld(polisNummer, genereerRandomString(polisNummer));
        vulVeld(kenmerk, genereerRandomString(kenmerk));
        vulVeld(dekking, genereerRandomString(dekking));
        vulVeld(verzekerdeZaak, genereerRandomString(verzekerdeZaak));
        vulVeld(premie, String.valueOf(randomGetals(5000)));
        LocalDate ingangsDatum = genereerDatum(null);
        vulVeld(ingangsDatumString, ingangsDatum.toString("ddMMyyyy"));
        assertEquals(ingangsDatum.toString("dd-MM-yyyy"), getText(ingangsDatumString));
        assertEquals(ingangsDatum.plusYears(1).toString("dd-MM-yyyy"), getText(prolongatiedatumString));
        vulVeld(wijzigingsdatumString, genereerDatum(null).toString("dd-MM-yyyy"));
        selecteerUitSelectieBox(betaalfrequentie, "Kwartaal");
        vulVeld(omschrijvingVerzekering, genereerRandomString(prolongatiedatumString));
    }

    public void controleerIngangsdatumEnStatus(String ingangsdatum, String status) {
        assertEquals(ingangsdatum, getText(ingangsDatumString));
        assertEquals(status, getText(this.status));
    }

    public void opslaan() {
        klikEnWacht(opslaanPolis);

        wachtFf();
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
