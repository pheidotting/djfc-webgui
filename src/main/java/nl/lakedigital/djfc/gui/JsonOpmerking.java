package nl.lakedigital.djfc.gui;

import java.io.Serializable;

public class JsonOpmerking implements Serializable, Comparable<JsonOpmerking> {
    private static final long serialVersionUID = -2035670222129537280L;

    private Long id;
    private String tijd;
    private String opmerking;
    private String medewerker;
    private String medewerkerId;
    private String schade;
    private String hypotheek;
    private String polis;
    private String relatie;
    private String bedrijf;
    private String aangifte;
    private String jaarcijfers;
    private String risicoAnalyse;
    private String soort;
    private String tekstBackup;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTijd() {
        return tijd;
    }

    public void setTijd(String tijd) {
        this.tijd = tijd;
    }

    public String getOpmerking() {
        return opmerking;
    }

    public void setOpmerking(String opmerking) {
        this.opmerking = opmerking;
    }

    public String getMedewerker() {
        return medewerker;
    }

    public void setMedewerker(String medewerker) {
        this.medewerker = medewerker;
    }

    public String getMedewerkerId() {
        return medewerkerId;
    }

    public void setMedewerkerId(String medewerkerId) {
        this.medewerkerId = medewerkerId;
    }

    public String getSchade() {
        return schade;
    }

    public void setSchade(String schade) {
        this.schade = schade;
    }

    public String getHypotheek() {
        return hypotheek;
    }

    public void setHypotheek(String hypotheek) {
        this.hypotheek = hypotheek;
    }

    public String getPolis() {
        return polis;
    }

    public void setPolis(String polis) {
        this.polis = polis;
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

    public String getAangifte() {
        return aangifte;
    }

    public void setAangifte(String aangifte) {
        this.aangifte = aangifte;
    }

    public String getJaarcijfers() {
        return jaarcijfers;
    }

    public void setJaarcijfers(String jaarcijfers) {
        this.jaarcijfers = jaarcijfers;
    }

    public String getRisicoAnalyse() {
        return risicoAnalyse;
    }

    public void setRisicoAnalyse(String risicoAnalyse) {
        this.risicoAnalyse = risicoAnalyse;
    }

    public String getSoort() {
        return soort;
    }

    public void setSoort(String soort) {
        this.soort = soort;
    }

    public String getTekstBackup() {
        return tekstBackup;
    }

    public void setTekstBackup(String tekstBackup) {
        this.tekstBackup = tekstBackup;
    }

    @Override
    public int compareTo(JsonOpmerking o) {
        return tijd.compareTo(o.tijd) * -1;
    }
}
