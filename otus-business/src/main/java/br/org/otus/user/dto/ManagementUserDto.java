package br.org.otus.user.dto;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.rest.dtos.Dto;
import br.org.tutty.Equalization;

public class ManagementUserDto implements Dto {
    @Equalization(name = "name")
    public String name;

    @Equalization(name = "surname")
    public String surname;

    @Equalization(name = "phone")
    public String phone;

    @Equalization(name = "email")
    public String email;

    @Equalization(name = "admin_flag")
    public Boolean admin;

    @Equalization(name = "enable")
    public Boolean enable;

    public String getEmail() {
        return email;
    }

    @Override
    public Boolean isValid() {
        return !name.isEmpty() &&
                !surname.isEmpty() &&
                !phone.isEmpty() &&
                !email.isEmpty()
                ? Boolean.TRUE : Boolean.FALSE;
    }

    @Override
    public void encrypt() throws EncryptedException {
    }
}
