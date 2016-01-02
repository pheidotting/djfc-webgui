package nl.dias.it;

import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class StringGeneratieUtil {
    private static final List<String> voornamen = new ArrayList<>();
    private static final List<String> achternamen = new ArrayList<>();
    private static final List<String> tussenvoegsels = new ArrayList<>();
    private final List<String> bsns = new ArrayList<String>();
    private final List<String> straatnamen = new ArrayList<>();
    private final List<String> postcodes = new ArrayList<>();
    private final List<String> toevoegingen = new ArrayList<>();
    private final List<String> plaatsnamen = new ArrayList<>();
    private final List<String> bics = new ArrayList<>();
    private final List<String> ibans = new ArrayList<>();
    private static final List<String> telefoonnummers = new ArrayList<>();

    public static void init() {
        voornamen.add("Patrick");
        voornamen.add("Sabine");
        voornamen.add("Bennie");
        voornamen.add("Bertha");
        voornamen.add("Harry");
        voornamen.add("Ans");
        voornamen.add("Jan");
        voornamen.add("Henk");
        voornamen.add("Geert");
        voornamen.add("Harm");
        voornamen.add("Bertus");
        voornamen.add("Willem");
        voornamen.add("Hendrik");

        achternamen.add("Heidotting");
        achternamen.add("Lette");
        achternamen.add("Jansen");
        achternamen.add("Willemsen");
        achternamen.add("Haverkamp");

        tussenvoegsels.add("");
        tussenvoegsels.add("");
        tussenvoegsels.add("van der");
        tussenvoegsels.add("de");
    }

    public StringGeneratieUtil() {
        bsns.add("103127586");
        bsns.add("400544350");
        bsns.add("530033379");
        bsns.add("605180994");
        bsns.add("485251061");
        bsns.add("680663496");
        bsns.add("211384550");

        straatnamen.add("Herderstraat");
        straatnamen.add("Eemslandweg");
        straatnamen.add("Langestraat");
        straatnamen.add("Loperstraat");
        straatnamen.add("Lintveldebrink");
        straatnamen.add("Helmerhoek");

        plaatsnamen.add("Zwartemeer");
        plaatsnamen.add("Klazienaveen");
        plaatsnamen.add("Enschede");
        plaatsnamen.add("Emmen");
        plaatsnamen.add("Groningen");

        postcodes.add("7894AB");
        postcodes.add("7891RB");
        postcodes.add("7891JT");
        postcodes.add("7544KR");

        toevoegingen.add("");
        toevoegingen.add("");
        toevoegingen.add("to");

        telefoonnummers.add("0612345678");
        telefoonnummers.add("0609876543");

        bics.add("");
        bics.add("");
        bics.add("NLBIC");

        ibans.add("NL56ANAA0167829645");
        ibans.add("NL17ANAA0355304090");
        ibans.add("NL19ANAA0371693659");
        ibans.add("NL75ANAA0427915112");
        ibans.add("NL28ANAA0878694455");
    }

    public static String genereerRandomString(WebElement webElement) {
        int lengte = 2500;
        if (webElement.getAttribute("maxlength") != null) {
            lengte = Integer.valueOf(webElement.getAttribute("maxlength"));
        }

        return genereerRandomString(lengte);
    }

    public static String genereerRandomString(int lengte) {
        StringBuffer sb = new StringBuffer();
        char[] chars = "abcdefghijklmnopqrstuvwxyz".toCharArray();
        Random random = new Random();
        for (int i = 0; i < lengte; i++) {
            char c = chars[random.nextInt(chars.length)];
            sb.append(c);
        }
        return sb.toString().substring(0, lengte - 1);
    }

    private static String kiesRandom(List<String> lijst) {
        if (lijst == null || lijst.size() == 0) {
            init();
        }
        return lijst.get(randomGetals(lijst.size()));
    }

    private static String kiesRandoms(List<String> lijst) {
        return lijst.get(randomGetals(lijst.size()));
    }

    public static String genereerVoornaam() {
        return kiesRandom(voornamen);
    }

    public static String genereerAchternaam() {
        return kiesRandom(achternamen);
    }

    public static String genereerTussenvoegsel() {
        return kiesRandom(tussenvoegsels);
    }

    public static String genereerEmailAdres(String voornaam, String tussenvoegsel, String achternaam) {
        StringBuilder sb = new StringBuilder();
        sb.append(voornaam);
        sb.append("@");
        if ("".equals(tussenvoegsel)) {
            sb.append(tussenvoegsel);
        }
        sb.append(achternaam);
        sb.append(".nl");
        return sb.toString().toLowerCase();
    }

    public String genereerBsn() {
        return kiesRandom(bsns);
    }

    public String genereerStraatnaam() {
        return kiesRandom(straatnamen);
    }

    public String genereerPostcode() {
        return kiesRandom(postcodes);
    }

    public String genereerPlaatsnaam() {
        return kiesRandom(plaatsnamen);
    }

    public String genereerToevoeging() {
        return kiesRandom(toevoegingen);
    }

    public String genereerIban() {
        return kiesRandom(ibans);
    }

    public String genereerBic() {
        return kiesRandom(bics);
    }

    public static String genereerTelefoonnummers() {
        telefoonnummers.add("0612345678");
        telefoonnummers.add("0609876543");

        return kiesRandoms(telefoonnummers);
    }

    public LocalDate genereerDatum() {
        return genereerDatum(null);
    }

    public LocalDateTime genereerDatumTijd() {
        return genereerDatumTijd(null);
    }

    public static LocalDate genereerDatum(LocalDate ligtNa) {
        LocalDate datum = new LocalDate().minusDays(randomGetals(20000));
        if (ligtNa != null) {
            while (datum.isBefore(ligtNa)) {
                datum = new LocalDate().minusDays(randomGetals(20000));
            }
        }
        return datum;
    }

    public LocalDateTime genereerDatumTijd(LocalDate ligtNa) {
        LocalDateTime datum = new LocalDateTime().minusDays(randomGetal(20000));
        if (ligtNa != null) {
            while (datum.isBefore(ligtNa)) {
                datum = new LocalDateTime().minusDays(randomGetal(20000));
            }
        }
        return datum;
    }

    public Object kiesUitItems(Object... objecten) {
        return objecten[randomGetal(objecten.length)];
    }

    public int randomGetal(int max) {
        return (int) (Math.random() * max);
    }

    public static int randomGetals(int max) {
        return (int) (Math.random() * max);
    }
}
