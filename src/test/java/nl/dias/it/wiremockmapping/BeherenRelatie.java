package nl.dias.it.wiremockmapping;

import com.github.tomakehurst.wiremock.WireMockServer;
import nl.lakedigital.djfc.commons.json.JsonLijstRelaties;
import nl.lakedigital.djfc.commons.json.JsonRelatie;

import java.util.ArrayList;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class BeherenRelatie extends StandaardMapping {

    public BeherenRelatie(WireMockServer wireMock) {
        super.wireMockServer = wireMock;

        standaardMapping();

        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/gebruiker/lees")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new JsonRelatie()))));
        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/taak/alleOpenTakenVoorRelatie")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new ArrayList<>()))));
        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/gebruiker/zoekOpNaamAdresOfPolisNummer")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(new JsonLijstRelaties()))));
    }

    public static void main(String[] args) {
        new BeherenRelatie(null);
    }
}
