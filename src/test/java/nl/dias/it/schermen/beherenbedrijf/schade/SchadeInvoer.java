package nl.dias.it.schermen.beherenbedrijf.schade;

import nl.dias.it.schermen.IndexPagina;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import static nl.dias.it.Hulp.*;
import static nl.dias.it.StringGeneratieUtil.genereerRandomString;
import static nl.dias.it.StringGeneratieUtil.randomGetals;
import static org.junit.Assert.assertEquals;

public class SchadeInvoer extends IndexPagina {
    public static final String URL = "beherenBedrijf/5/schade/0";

    @FindBy(id = "polisVoorSchademelding")
    private WebElement polisVoorSchademelding;
    @FindBy(id = "schadeNummerMaatschappij")
    private WebElement schadeNummerMaatschappij;
    @FindBy(id = "schadeNummerTussenpersoon")
    private WebElement schadeNummerTussenpersoon;
    @FindBy(id = "soortSchade")
    private WebElement soortSchade;
    @FindBy(id = "locatieSchade")
    private WebElement locatieSchade;
    @FindBy(id = "statusSchade")
    private WebElement statusSchade;
    @FindBy(id = "datumTijdSchade")
    private WebElement datumTijdSchade;
    @FindBy(id = "datumTijdMelding")
    private WebElement datumTijdMelding;
    @FindBy(id = "datumAfgehandeld")
    private WebElement datumAfgehandeld;
    @FindBy(id = "eigenRisico")
    private WebElement eigenRisico;
    @FindBy(id = "omschrijving")
    private WebElement omschrijving;

    //Opmerkingen
    @FindBy(id = "nieuweOpmerking")
    private WebElement nieuweOpmerking;
    @FindBy(id = "opslaanOpmerking")
    private WebElement opslaanOpmerking;

    @FindBy(id = "tekst1")
    private WebElement tekst1;
    @FindBy(id = "tekst2")
    private WebElement tekst2;

    @FindBy(id = "schadeMeldingOpslaan")
    private WebElement schadeMeldingOpslaan;

    public void vulMinimaal() {
        selecteerUitSelectieBox(polisVoorSchademelding, "Motor (polisnummer2)");
        vulVeld(datumTijdSchade, "010220131234");
        assertEquals("01-02-2013 12:34", getText(datumTijdSchade));
        vulVeld(schadeNummerMaatschappij, genereerRandomString(schadeNummerMaatschappij));
        vulVeld(soortSchade, genereerRandomString(soortSchade));
        selecteerUitSelectieBox(statusSchade, "Status2");
        vulVeld(datumTijdMelding, "030420152359");
        assertEquals("03-04-2015 23:59", getText(datumTijdMelding));
        vulVeld(eigenRisico, String.valueOf(randomGetals(2000)));
    }

    public void vulMaximaal() {
        vulMinimaal();

        vulVeld(schadeNummerTussenpersoon, genereerRandomString(schadeNummerTussenpersoon));
        vulVeld(locatieSchade, genereerRandomString(locatieSchade));
        vulVeld(datumAfgehandeld, "04062016");
        assertEquals("04-06-2016", getText(datumAfgehandeld));
        vulVeld(omschrijving, genereerRandomString(omschrijving));
    }

    public void opslaan() {
        klikEnWacht(schadeMeldingOpslaan);
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

    public String getTekst2() {
        return tekst2.getText();
    }
}
