package br.org.otus.security.services;

import br.org.otus.exceptions.*;
import br.org.otus.security.dtos.AuthenticationData;
import br.org.otus.security.dtos.AuthenticationDto;
import br.org.otus.security.dtos.ProjectAuthenticationDto;

public interface SecurityService {

	String authenticate(AuthenticationData authenticationData)
			throws InvalidPasswordException, EmailNotFoundException, UserDisabledException, TokenException;

	void invalidate(String token);

	String projectAuthenticate(AuthenticationData authenticationData) throws InvalidDtoException, TokenException, InvalidPasswordException;
}
