package br.org.otus.security.services;

import br.org.otus.exceptions.EmailNotFoundException;
import br.org.otus.exceptions.InvalidPasswordException;
import br.org.otus.exceptions.TokenException;
import br.org.otus.exceptions.UserDisabledException;
import br.org.otus.security.dtos.AuthenticationDto;

public interface SecurityService {

	String authenticate(AuthenticationDto authenticationDto)
			throws InvalidPasswordException, EmailNotFoundException, UserDisabledException, TokenException;

	void invalidate(String token);
}
