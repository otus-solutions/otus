package br.org.otus.email.dto;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.rest.dtos.Dto;
import br.org.otus.security.EncryptorResources;
import br.org.tutty.Equalization;

public class EmailSenderDto implements Dto{

    @Equalization(name = "name")
    private String name;

    @Equalization(name = "email")
    private String email;

    @Equalization(name = "password")
    private String password;

    private String passwordConfirm;

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public Boolean isValid() {
        return Boolean.TRUE;
    }

    @Override
    public void encrypt() throws EncryptedException {
        this.password = EncryptorResources.encryptReversible(password);
    }

}
