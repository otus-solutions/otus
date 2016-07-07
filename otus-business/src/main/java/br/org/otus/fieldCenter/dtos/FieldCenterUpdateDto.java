package br.org.otus.fieldCenter.dtos;

import br.org.otus.rest.dtos.Dto;
import br.org.tutty.Equalization;

public class FieldCenterUpdateDto implements Dto {
    private String acronym;

    @Equalization(name = "name")
    private String name;

    @Equalization(name = "state")
    private String state;

    @Equalization(name = "address")
    private String address;

    @Equalization(name = "complement")
    private String complement;

    @Equalization(name = "country")
    private String country;

    @Equalization(name = "zip")
    private String zip;

    @Equalization(name = "phone")
    private String phone;

    public String getAcronym() {
        return acronym;
    }

    @Override
    public Boolean isValid() {
        return !acronym.isEmpty();
    }

    public void setAcronym(String acronym) {
        this.acronym = acronym;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getComplement() {
        return complement;
    }

    public void setComplement(String complement) {
        this.complement = complement;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}
