package br.org.otus.fieldCenter.dtos;

import br.org.otus.rest.dtos.Dto;
import br.org.tutty.Equalization;

public class FieldCenterDto implements Dto {
    @Equalization(name = "name")
    public String name;

    @Equalization(name = "acronym")
    public String acronym;

    @Equalization(name = "country")
    public String country;

    @Equalization(name = "state")
    public String state;

    @Equalization(name = "address")
    public String address;

    @Equalization(name = "complement")
    public String complement;

    @Equalization(name = "zip")
    public String zip;

    @Equalization(name = "phone")
    public String phone;

    @Override
    public Boolean isValid() {
        return !name.isEmpty() &&
                !acronym.isEmpty()
                ? Boolean.TRUE : Boolean.FALSE;
    }
}
