package nl.dias.it.wiremockmapping;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.google.common.collect.Lists;
import nl.lakedigital.djfc.commons.json.*;

import java.util.ArrayList;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class BeherenBedrijfBestaand extends StandaardMapping {
    private JsonBedrijf jsonBedrijf;
    private JsonAdres jsonAdres;
    private JsonContactPersoon jsonContactPersoon;

    public BeherenBedrijfBestaand(WireMockServer wireMock) {
        super.wireMockServer = wireMock;

        standaardMapping();
        jsonBedrijf = new JsonBedrijf();
        jsonBedrijf.setNaam("Fa. List & Bedrog");
        jsonBedrijf.setcAoVerplichtingen("cao verplichtingen");
        jsonBedrijf.setEmail("emailadres");
        jsonBedrijf.setHoedanigheid("hoedanigheid");
        jsonBedrijf.setInternetadres("Internetadres");
        jsonBedrijf.setKvk("kvk nummer");
        jsonBedrijf.setRechtsvorm("rechtsvorrum");

        jsonAdres = new JsonAdres();
        jsonAdres.setPostcode("2345CB");
        jsonAdres.setHuisnummer(45L);
        jsonAdres.setStraat("straatnaam");
        jsonAdres.setPlaats("plaatsnaam");
        jsonAdres.setToevoeging("toevoeging");

        jsonContactPersoon = new JsonContactPersoon();
        jsonContactPersoon.setAchternaam("jsonContactPersoonAchternaam");
        jsonContactPersoon.setEmailadres("jsonContactPersoonEmailadres");
        jsonContactPersoon.setFunctie("jsonContactPersoonFunctie");
        jsonContactPersoon.setTussenvoegsel("jsonContactPersoonTussenvoegsel");
        jsonContactPersoon.setVoornaam("jsonContactPersoonVoornaam");
        JsonTelefoonnummer jsonTelefoonnummerBijContactpersoon = new JsonTelefoonnummer();
        jsonTelefoonnummerBijContactpersoon.setOmschrijving("jsonTelefoonnummerBijContactpersoonOmschrijving");
        jsonTelefoonnummerBijContactpersoon.setSoort("Zakelijk");
        jsonTelefoonnummerBijContactpersoon.setTelefoonnummer("0591234567");
        jsonContactPersoon.getTelefoonnummers().add(jsonTelefoonnummerBijContactpersoon);

        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/bedrijf/lees")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(jsonBedrijf))));
        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/bijlage/lijstBijlages")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new ArrayList<>()))));
        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/opmerking/lijstOpmerkingen")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new ArrayList<>()))));
        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/adres/alles")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(Lists.newArrayList(jsonAdres)))));
        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/telefoonnummer/alles")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new ArrayList<>()))));
        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/gebruiker/alleContactPersonen")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(Lists.newArrayList(jsonContactPersoon)))));
        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/telefoonnummer/alles")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new ArrayList<>()))));
        wireMockServer.stubFor(post(urlEqualTo("/dejonge/rest/medewerker/bedrijf/opslaan")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new JsonFoutmelding()))));
        wireMockServer.stubFor(post(urlEqualTo("/dejonge/rest/medewerker/opmerking/opslaan")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson("1"))));
    }

    public static void main(String[] args) {
        new BeherenBedrijfBestaand(null);
    }

    public JsonBedrijf getJsonBedrijf() {
        return jsonBedrijf;
    }

    public JsonAdres getJsonAdres() {
        return jsonAdres;
    }

    public JsonContactPersoon getJsonContactPersoon() {
        return jsonContactPersoon;
    }
}
