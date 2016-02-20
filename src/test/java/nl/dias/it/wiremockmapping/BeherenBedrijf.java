package nl.dias.it.wiremockmapping;

import com.github.tomakehurst.wiremock.WireMockServer;
import nl.lakedigital.djfc.commons.json.JsonBedrijf;
import nl.lakedigital.djfc.commons.json.JsonFoutmelding;

import java.util.ArrayList;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class BeherenBedrijf extends StandaardMapping {

    public BeherenBedrijf(WireMockServer wireMock) {
        super.wireMockServer = wireMock;

        standaardMapping();

        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/bedrijf/lees")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new JsonBedrijf()))));
        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/bijlage/lijstBijlages")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new ArrayList<>()))));
        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/opmerking/lijstOpmerkingen")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new ArrayList<>()))));
        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/adres/alles")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new ArrayList<>()))));
        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/telefoonnummer/alles")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new ArrayList<>()))));
        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/gebruiker/alleContactPersonen")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new ArrayList<>()))));
        wireMockServer.stubFor(post(urlEqualTo("/dejonge/rest/medewerker/bedrijf/opslaan")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new JsonFoutmelding()))));
    }

    public static void main(String[] args) {
        new BeherenBedrijf(null);
    }
}
