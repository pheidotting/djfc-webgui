package nl.dias.it.schermen.jaarcijfers;

import com.google.common.base.Predicate;
import nl.dias.it.schermen.IndexPagina;
import nl.lakedigital.djfc.commons.json.JsonJaarCijfers;
import nl.lakedigital.djfc.commons.json.JsonOpmerking;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.List;

import static com.google.common.collect.Iterables.filter;
import static com.google.common.collect.Iterables.getFirst;
import static nl.dias.it.Hulp.*;
import static nl.dias.it.StringGeneratieUtil.genereerRandomString;
import static org.junit.Assert.assertEquals;

public class LijstJaarCijfers extends IndexPagina {
    public static final String URL = "beherenBedrijf/5/jaarcijfers";

    @FindBy(id = "jaar")
    List<WebElement> jaar;

    //Opmerkingen
    @FindBy(id = "nieuweOpmerking")
    private List<WebElement> nieuweOpmerking;
    @FindBy(id = "opslaanOpmerking")
    private List<WebElement> opslaanOpmerking;

    @FindBy(id = "tekst1")
    private WebElement tekst1;
    @FindBy(id = "tekst2")
    private WebElement tekst2;
    @FindBy(id = "tekst3")
    private WebElement tekst3;

    public void controleer(List<JsonJaarCijfers> jaarCijferses, Long jaarVoorOpmerking) {
        assertEquals(jaarCijferses.size(), jaar.size());

        for (final JsonJaarCijfers jaarCijfers : jaarCijferses) {
            final WebElement we = getFirst(filter(this.jaar, new Predicate<WebElement>() {
                @Override
                public boolean apply(WebElement webElement) {
                    return jaarCijfers.getJaar().toString().equals(webElement.getText());
                }
            }), null);
            if (we == null) {
                throw new AssertionError(jaarCijfers.getJaar() + " niet gevonden");
            }
            int index = jaar.indexOf(we);

            klikEnWacht(we);
            wachtFf();

            for (JsonOpmerking opmerking : jaarCijfers.getOpmerkingen()) {
                if (opmerking.getId() == 1L) {
                    assertEquals(opmerking.getOpmerking(), tekst1.getText());
                }
                if (opmerking.getId() == 2L) {
                    assertEquals(opmerking.getOpmerking(), tekst2.getText());
                }
            }

            if (jaarVoorOpmerking.equals(jaarCijfers.getJaar())) {
                String opmerking = genereerRandomString(nieuweOpmerking.get(index));
                vulVeld(nieuweOpmerking.get(index), opmerking);
                klikEnWacht(opslaanOpmerking.get(index));

                wachtFf();

                assertEquals(opmerking, tekst3.getText());
            }

            klikEnWacht(we);
        }
    }
}
