package nl.lakedigital.djfc.gui;

import java.io.Serializable;
import java.util.List;

public class JsonTelefoonnummer implements Serializable {
    private static final long serialVersionUID = 3624291960507458499L;

    private Long id;
    private String telefoonnummer;
    private String soort;
    private String omschrijving;
    private List<String> errors;
    private String bedrijf;
    private Long relatie;
    private Long contactpersoon;

    public JsonTelefoonnummer() {
    }

    public JsonTelefoonnummer(Long id, String telefoonnummer, String soort, String omschrijving) {
        super();
        this.id = id;
        this.telefoonnummer = telefoonnummer;
        this.soort = soort;
        this.omschrijving = omschrijving;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTelefoonnummer() {
        return telefoonnummer;
    }

    public void setTelefoonnummer(String telefoonnummer) {
        this.telefoonnummer = telefoonnummer;
    }

    public String getSoort() {
        return soort;
    }

    public void setSoort(String soort) {
        this.soort = soort;
    }

    public String getOmschrijving() {
        return omschrijving;
    }

    public void setOmschrijving(String omschrijving) {
        this.omschrijving = omschrijving;
    }

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }

    public String getBedrijf() {
        return bedrijf;
    }

    public void setBedrijf(String bedrijf) {
        this.bedrijf = bedrijf;
    }

    public Long getRelatie() {
        return relatie;
    }

    public void setRelatie(Long relatie) {
        this.relatie = relatie;
    }

    public Long getContactpersoon() {
        return contactpersoon;
    }

    public void setContactpersoon(Long contactpersoon) {
        this.contactpersoon = contactpersoon;
    }
}