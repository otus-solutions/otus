package br.org.otus.user.dto;

import br.org.otus.email.EmailSender;
import br.org.otus.security.EncryptorResources;
import br.org.tutty.Equalization;

public class UserDto implements EmailSender {

    @Equalization(name = "email")
    private String email;

    @Equalization(name = "password")
    private String password;

    private String passwordConfirm;

    public void encrypt() {
        this.password = EncryptorResources.encrypt(getPassword());
    }

    @Override
    public String getName() {
        return null;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public String getPasswordConfirm() {
        return passwordConfirm;
    }

}