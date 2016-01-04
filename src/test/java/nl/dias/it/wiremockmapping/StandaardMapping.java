package nl.dias.it.wiremockmapping;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.google.gson.Gson;
import nl.lakedigital.djfc.commons.json.IngelogdeGebruiker;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig;

public abstract class StandaardMapping {
    protected static Gson gson = new Gson();
    public static WireMockServer wireMockServer;

    protected void standaardMapping() {
        if (wireMockServer == null) {
            wireMockServer = new WireMockServer(wireMockConfig().port(8888)); //No-args constructor will start on port 8080, no HTTPS
        }

        wireMockServer.start();

        IngelogdeGebruiker ingelogdeGebruiker = new IngelogdeGebruiker();
        ingelogdeGebruiker.setGebruikersnaam("Jax Teller");
        ingelogdeGebruiker.setId("34");
        ingelogdeGebruiker.setKantoor("Teller Morrow");

        wireMockServer.stubFor(get(urlEqualTo("/dejonge/rest/authorisatie/authorisatie/ingelogdeGebruiker")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json").withBody(gson.toJson(ingelogdeGebruiker))));
        wireMockServer.stubFor(post(urlEqualTo("/dejonge/rest/authorisatie/log4j/log4javascript")).willReturn(aResponse().withStatus(200)));
    }
}
