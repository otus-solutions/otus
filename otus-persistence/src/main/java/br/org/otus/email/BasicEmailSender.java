package br.org.otus.email;

import br.org.tutty.Equalization;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

@Embeddable
public class BasicEmailSender implements EmailSender {

    @Equalization(name = "name")
    @NotNull
    private String name;

    @Equalization(name = "email")
    @NotNull
    private String emailAddress;

    @Equalization(name = "password")
    @NotNull
    private String password;

    public BasicEmailSender() {
    }

    public BasicEmailSender(String name, String emailAddress, String password) {
        super();
        this.name = name;
        this.emailAddress = emailAddress;
        this.password = password;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getEmail() {
        return emailAddress;
    }

    @Override
    public String getPassword() {
        return password;
    }
}
