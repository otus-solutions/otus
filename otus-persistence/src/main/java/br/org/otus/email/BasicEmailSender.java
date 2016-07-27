package br.org.otus.email;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Type;

import br.org.tutty.Equalization;

@Entity
public class BasicEmailSender implements EmailSender {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Type(type = "objectid")
    private String id;

    @Equalization(name = "name")
    @NotNull
    private String name;

    @Equalization(name = "email")
    @NotNull
    private String emailAddress;

    @Equalization(name = "password")
    @NotNull
    private String password;

    protected BasicEmailSender() {
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
