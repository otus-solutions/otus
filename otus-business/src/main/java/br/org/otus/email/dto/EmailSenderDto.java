package br.org.otus.email.dto;

import br.org.otus.email.EmailSender;
import br.org.otus.security.EncryptorResources;
import br.org.tutty.Equalization;

public class EmailSenderDto implements EmailSender {

    @Equalization(name = "name")
    private String name;

    @Equalization(name = "email")
    private String email;

    @Equalization(name = "password")
    private String password;

    public void encrypt() {
        this.password = EncryptorResources.encrypt(password);
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

}
