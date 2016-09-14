package br.org.otus.security.dtos;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.rest.dtos.Dto;

public interface AuthenticationData extends Dto{
    String getKey();

    String getPassword();

    String getIssuer();

    void encrypt() throws EncryptedException;
}
