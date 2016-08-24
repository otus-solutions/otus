package br.org.otus.security.services;

import br.org.otus.exceptions.webservice.security.AuthenticationException;
import br.org.otus.exceptions.webservice.security.TokenException;
import br.org.otus.security.dtos.AuthenticationData;
import br.org.otus.security.dtos.UserSecurityAuthorizationDto;

public interface SecurityService {

	UserSecurityAuthorizationDto authenticate(AuthenticationData authenticationData) throws TokenException, AuthenticationException;

	void invalidate(String token);

	String projectAuthenticate(AuthenticationData authenticationData) throws TokenException, AuthenticationException;
}
