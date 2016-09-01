package br.org.otus.security.services;

import br.org.otus.exceptions.EmailNotFoundException;
import br.org.otus.exceptions.InvalidDtoException;
import br.org.otus.exceptions.InvalidPasswordException;
import br.org.otus.exceptions.TokenException;
import br.org.otus.exceptions.UserDisabledException;
import br.org.otus.security.dtos.AuthenticationData;

public interface SecurityService {

	String authenticate(AuthenticationData authenticationData)
			throws InvalidPasswordException, EmailNotFoundException, UserDisabledException, TokenException;

	void invalidate(String token);

	String projectAuthenticate(AuthenticationData authenticationData) throws InvalidDtoException, TokenException, InvalidPasswordException;
}
