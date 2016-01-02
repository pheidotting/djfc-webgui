package nl.dias.it.schermen.schade;

import com.google.common.base.Predicate;
import nl.dias.it.schermen.IndexPagina;
import nl.lakedigital.djfc.commons.json.JsonOpmerking;
import nl.lakedigital.djfc.commons.json.JsonSchade;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.List;

import static com.google.common.collect.Iterables.filter;
import static com.google.common.collect.Iterables.getFirst;
import static nl.dias.it.Hulp.klikEnWacht;
import static nl.dias.it.Hulp.wachtFf;
import static org.junit.Assert.assertEquals;

public class LijstSchades extends IndexPagina {
    public static final String URL = "beherenBedrijf/5/schades";

    @FindBy(id = "titel")
    private List<WebElement> titels;
    @FindBy(id = "soortSchade")
    private List<WebElement> soortSchade;
    @FindBy(id = "schadeNummerMaatschappij")
    private List<WebElement> schadeNummerMaatschappij;


    @FindBy(id = "schadeNummerTussenPersoon")
    private List<WebElement> schadeNummerTussenPersoon;
    @FindBy(id = "locatie")
    private List<WebElement> locatie;
    @FindBy(id = "statusSchade")
    private List<WebElement> statusSchade;
    @FindBy(id = "datumTijdSchade")
    private List<WebElement> datumTijdSchade;
    @FindBy(id = "datumTijdMelding")
    private List<WebElement> datumTijdMelding;
    @FindBy(id = "datumAfgehandeld")
    private List<WebElement> datumAfgehandeld;
    @FindBy(id = "eigenRisico")
    private List<WebElement> eigenRisico;
    @FindBy(id = "omschrijving")
    private List<WebElement> omschrijving;
    @FindBy(id = "tijd")
    private List<WebElement> tijd;
    @FindBy(id = "medewerker")
    private List<WebElement> medewerker;
    @FindBy(id = "opmerking")
    private List<WebElement> opmerking;

    public void controleer(List<JsonSchade> jsonSchades) {
        assertEquals(jsonSchades.size(), titels.size());

        for (final JsonSchade jsonSchade : jsonSchades) {
            final WebElement we = getFirst(filter(this.titels, new Predicate<WebElement>() {
                @Override
                public boolean apply(WebElement webElement) {
                    String titel = jsonSchade.getSoortSchade() + " (" + jsonSchade.getSchadeNummerMaatschappij() + ")";
                    return titel.equals(webElement.getText());
                }
            }), null);
            if (we == null) {
                throw new AssertionError(jsonSchade.getSoortSchade() + " niet gevonden");
            }
            int index = titels.indexOf(we);

            klikEnWacht(we);
            wachtFf();

            assertEquals(jsonSchade.getSchadeNummerMaatschappij(), schadeNummerMaatschappij.get(index).getText());
            assertEquals(jsonSchade.getSoortSchade(), soortSchade.get(index).getText());
            assertEquals(jsonSchade.getSchadeNummerTussenPersoon(), schadeNummerTussenPersoon.get(index).getText());
            assertEquals(jsonSchade.getLocatie(), locatie.get(index).getText());
            assertEquals(jsonSchade.getStatusSchade(), statusSchade.get(index).getText());
            assertEquals(jsonSchade.getDatumTijdSchade(), datumTijdSchade.get(index).getText());
            assertEquals(jsonSchade.getDatumTijdMelding(), datumTijdMelding.get(index).getText());
            assertEquals(jsonSchade.getDatumAfgehandeld(), datumAfgehandeld.get(index).getText());
            assertEquals("€ " + jsonSchade.getEigenRisico(), eigenRisico.get(index).getText());
            assertEquals(jsonSchade.getOmschrijving(), omschrijving.get(index).getText());
            for (JsonOpmerking jsonOpmerking : jsonSchade.getOpmerkingen()) {
                assertEquals(jsonOpmerking.getTijd(), tijd.get(0).getText());
                assertEquals(jsonOpmerking.getMedewerker(), medewerker.get(0).getText());
                assertEquals(jsonOpmerking.getOpmerking(), opmerking.get(0).getText());
            }

            klikEnWacht(we);
        }
    }
}
