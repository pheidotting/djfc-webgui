package nl.lakedigital.djfc.gui;

public class JsonAdres {
    private static final long serialVersionUID = 2361944992062349932L;

    private Long id;
    private String straat;
    private Long huisnummer;
    private String toevoeging;
    private String postcode;
    private String plaats;
    private String soortAdres;
    private String relatie;
    private String bedrijf;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStraat() {
        return straat;
    }

    public void setStraat(String straat) {
        this.straat = straat;
    }

    public Long getHuisnummer() {
        return huisnummer;
    }

    public void setHuisnummer(Long huisnummer) {
        this.huisnummer = huisnummer;
    }

    public String getToevoeging() {
        return toevoeging;
    }

    public void setToevoeging(String toevoeging) {
        this.toevoeging = toevoeging;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getPlaats() {
        return plaats;
    }

    public void setPlaats(String plaats) {
        this.plaats = plaats;
    }

    public String getSoortAdres() {
        return soortAdres;
    }

    public void setSoortAdres(String soortAdres) {
        this.soortAdres = soortAdres;
    }

    public String getRelatie() {
        return relatie;
    }

    public void setRelatie(String relatie) {
        this.relatie = relatie;
    }

    public String getBedrijf() {
        return bedrijf;
    }

    public void setBedrijf(String bedrijf) {
        this.bedrijf = bedrijf;
    }

}
