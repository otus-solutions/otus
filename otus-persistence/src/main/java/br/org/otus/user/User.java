package br.org.otus.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Type;

import br.org.tutty.Equalization;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Type(type = "objectid")
    private String id;

    @Equalization(name = "name")
    private String name;

    @Equalization(name = "surname")
    private String surname;

    @Equalization(name = "phone")
    private String phone;

    @Equalization(name = "email")
    private String email;

    @Equalization(name = "password")
    private String password;

    @Equalization(name = "enable")
    private Boolean isEnable;

    @Equalization(name = "code")
    private Integer code;

    public User() {
        isEnable = false;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Boolean isEnable() {
        return isEnable;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

}
