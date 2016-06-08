package br.org.otus.user;

import br.org.tutty.Equalization;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Type(type = "objectid")
    private String id;

    @Equalization(name = "email")
    private String email;

    @Equalization(name = "password")
    private String password;

    @Equalization(name = "enable")
    private Boolean enable;

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public Boolean isEnable(){
        return enable;
    }
}
