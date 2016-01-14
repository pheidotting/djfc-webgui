package nl.dias.it.wiremockmapping;

import com.beust.jcommander.internal.Lists;
import com.github.tomakehurst.wiremock.WireMockServer;
import nl.lakedigital.djfc.commons.json.JsonPolis;

import java.util.List;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class BeherenPolissen extends StandaardMapping {
    public BeherenPolissen(WireMockServer wireMock) {
        super.wireMockServer = wireMock;

        standaardMapping();

        JsonPolis jsonPolis1 = new JsonPolis();
        jsonPolis1.setPolisNummer("123456789");
        jsonPolis1.setStatus("status1");
        jsonPolis1.setKenmerk("kenmerk1");
        jsonPolis1.setMaatschappij("maatschappij1");

        JsonPolis jsonPolis2 = new JsonPolis();
        jsonPolis2.setPolisNummer("234567890");
        jsonPolis2.setStatus("status2");
        jsonPolis2.setKenmerk("kenmerk2");
        jsonPolis2.setMaatschappij("maatschappij2");

        List<JsonPolis> polissen = Lists.newArrayList(jsonPolis1, jsonPolis2);

        List<String> maatschappijeen = Lists.newArrayList("maatschappij1", "maatschappij2");

        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/polis/lijst")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(polissen))));
        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/medewerker/overig/lijstVerzekeringsMaatschappijen")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(maatschappijeen))));
    }

    public static void main(String[] args) {
        new BeherenPolissen(null);
    }
}
