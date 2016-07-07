package br.org.otus.security.dtos;

import br.org.otus.rest.dtos.Dto;

public interface AuthenticationData extends Dto{
    String getKey();

    String getPassword();

    String getIssuer();
}
