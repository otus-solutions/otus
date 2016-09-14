package br.org.otus.rest.dtos;

import br.org.otus.exceptions.webservice.security.EncryptedException;

public interface Dto {

    Boolean isValid();
    void encrypt() throws EncryptedException;
}
