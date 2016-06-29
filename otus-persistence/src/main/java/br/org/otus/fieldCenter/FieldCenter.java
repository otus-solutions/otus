package br.org.otus.fieldCenter;

import br.org.tutty.Equalization;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class FieldCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Type(type = "objectid")
    private String id;

    @Equalization(name = "name")
    @NotNull
    private String name;

    @Equalization(name = "acronym")
    @NotNull
    private String acronym;

    @Equalization(name = "identifier")
    @NotNull
    private Long identifier;

    @Equalization(name = "country")
    private String country;

    @Equalization(name = "state")
    private String state;

    @Equalization(name = "address")
    private String address;

    @Equalization(name = "complement")
    private String complement;

    @Equalization(name = "zip")
    private String zip;

    @Equalization(name = "phone")
    private String phone;

}
