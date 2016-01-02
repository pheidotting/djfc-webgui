package nl.dias.it.schermen.risicoanalyses;

import nl.dias.it.schermen.IndexPagina;
import nl.lakedigital.djfc.commons.json.JsonRisicoAnalyse;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import static nl.dias.it.Hulp.*;
import static nl.dias.it.StringGeneratieUtil.genereerRandomString;
import static org.junit.Assert.assertEquals;

public class RisicoAnalyses extends IndexPagina {
    public static final String URL = "beherenBedrijf/5/risicoanalyses";

    //Opmerkingen
    @FindBy(id = "nieuweOpmerking")
    private WebElement nieuweOpmerking;
    @FindBy(id = "opslaanOpmerking")
    private WebElement opslaanOpmerking;

    @FindBy(id = "tekst1")
    private WebElement tekst1;
    @FindBy(id = "tekst2")
    private WebElement tekst2;
    @FindBy(id = "tekst3")
    private WebElement tekst3;

    public void controleer(JsonRisicoAnalyse risicoAnalyse) {
        assertEquals(risicoAnalyse.getOpmerkingen().get(0).getOpmerking(), tekst1.getText());
        assertEquals(risicoAnalyse.getOpmerkingen().get(1).getOpmerking(), tekst2.getText());

        String opmerking = genereerRandomString(nieuweOpmerking);
        vulVeld(nieuweOpmerking, opmerking);
        klikEnWacht(opslaanOpmerking);

        wachtFf();

        assertEquals(opmerking, tekst3.getText());
    }

}
