package nl.dias.it.schermen;

import nl.dias.it.Hulp;
import org.joda.time.LocalDateTime;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.List;

public abstract class IndexPagina {
    public static final String URL = "";

    @FindBy(id = "alertSucces")
    private WebElement alertSucces;
    @FindBy(id = "alertDanger")
    private WebElement alertDanger;
    @FindBy(id = "uitloggen")
    private WebElement uitloggen;

    @FindBy(className = "validationMessage")
    private List<WebElement> knockoutMelding;

    public String leesFoutmelding() {
        LocalDateTime timeOut = new LocalDateTime().plusSeconds(Hulp.zoekTimeOut);
        while ((alertDanger.getText() == null || alertDanger.getText().equals("")) && LocalDateTime.now().isBefore(timeOut)) {
            Hulp.wachtFf();
        }
        return alertDanger.getText();
    }

    public String leesmelding() {
        LocalDateTime timeOut = new LocalDateTime().plusSeconds(Hulp.zoekTimeOut);
        while ((alertSucces.getText() == null || alertSucces.getText().equals("")) && LocalDateTime.now().isBefore(timeOut)) {
            Hulp.wachtFf();
        }
        return alertSucces.getText();
    }

    public List<WebElement> getKnockoutMelding() {
        return knockoutMelding;
    }

    public void uitloggen() {
        Hulp.klikEnWacht(uitloggen);
    }
}
