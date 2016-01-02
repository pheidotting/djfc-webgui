package nl.dias.it.schermen.polis;

import com.google.common.base.Predicate;
import nl.dias.it.schermen.IndexPagina;
import nl.lakedigital.djfc.commons.json.JsonPolis;
import org.joda.time.LocalDate;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.google.common.collect.Iterables.filter;
import static com.google.common.collect.Iterables.getFirst;
import static nl.dias.it.Hulp.klikEnWacht;
import static nl.dias.it.Hulp.wachtFf;
import static org.junit.Assert.assertEquals;

public class LijstPolissen extends IndexPagina {
    public static final String URL = "beherenBedrijf/5/polissen";

    @FindBy(id = "titel")
    private List<WebElement> titels;
    @FindBy(id = "polisNummer")
    private List<WebElement> polisNummer;
    @FindBy(id = "status")
    private List<WebElement> status;
    @FindBy(id = "kenmerk")
    private List<WebElement> kenmerk;
    @FindBy(name = "status")
    private List<WebElement> statusLijst;
    @FindBy(name = "polisNummer")
    private List<WebElement> polisNummerLijst;
    @FindBy(name = "kenmerk")
    private List<WebElement> kenmerkLijst;
    @FindBy(name = "ingangsDatum")
    private List<WebElement> ingangsDatum;
    @FindBy(name = "eindDatum")
    private List<WebElement> eindDatum;
    @FindBy(name = "wijzigingsDatum")
    private List<WebElement> wijzigingsDatum;
    @FindBy(name = "prolongatieDatum")
    private List<WebElement> prolongatieDatum;
    @FindBy(name = "maatschappij")
    private List<WebElement> maatschappij;
    @FindBy(name = "premie")
    private List<WebElement> premie;
    @FindBy(name = "betaalfrequentie")
    private List<WebElement> betaalfrequentie;
    @FindBy(name = "omschrijvingVerzekering")
    private List<WebElement> omschrijvingVerzekering;

    public void controleer(List<JsonPolis> jsonPoli) {
        Map<String, String> bedragen = new HashMap<>();
        bedragen.put("234,0", "€ 234,00");
        bedragen.put("2345,1", "€ 2.345,10");
        bedragen.put("1,01", "€ 1,01");


        assertEquals(jsonPoli.size(), titels.size());
        assertEquals(jsonPoli.size(), polisNummer.size());
        assertEquals(jsonPoli.size(), status.size());
        assertEquals(jsonPoli.size(), kenmerk.size());

        for (final JsonPolis polis : jsonPoli) {
            final WebElement we = getFirst(filter(this.titels, new Predicate<WebElement>() {
                @Override
                public boolean apply(WebElement webElement) {
                    String titel = polis.getSoort() + " (" + polis.getPolisNummer() + ")";
                    return titel.equals(webElement.getText());
                }
            }), null);
            if (we == null) {
                throw new AssertionError(polis.getSoort() + " niet gevonden");
            }
            int index = titels.indexOf(we);

            assertEquals(polis.getPolisNummer(), polisNummer.get(index).getText());
            assertEquals(polis.getStatus(), status.get(index).getText());
            assertEquals(polis.getKenmerk(), kenmerk.get(index).getText());

            klikEnWacht(we);
            wachtFf();

            assertEquals(polis.getStatus(), statusLijst.get(index).getText());
            assertEquals(polis.getPolisNummer(), polisNummerLijst.get(index).getText());
            assertEquals(polis.getKenmerk(), kenmerkLijst.get(index).getText());
            assertEquals(new LocalDate(polis.getIngangsDatum()).toString("dd-MM-yyyy"), ingangsDatum.get(index).getText());
            assertEquals(new LocalDate(polis.getEindDatum()).toString("dd-MM-yyyy"), eindDatum.get(index).getText());
            assertEquals(new LocalDate(polis.getWijzigingsDatum()).toString("dd-MM-yyyy"), wijzigingsDatum.get(index).getText());
            assertEquals(new LocalDate(polis.getProlongatieDatum()).toString("dd-MM-yyyy"), prolongatieDatum.get(index).getText());
            assertEquals(bedragen.get(polis.getPremie()), premie.get(index).getText());
            assertEquals(polis.getMaatschappij(), maatschappij.get(index).getText());
            assertEquals(polis.getBetaalfrequentie(), betaalfrequentie.get(index).getText());
            assertEquals(polis.getOmschrijvingVerzekering(), omschrijvingVerzekering.get(index).getText());

            klikEnWacht(we);
        }
    }
}
