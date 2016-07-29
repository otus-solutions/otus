package br.org.otus.user.signup;

import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.signup.exception.SignupException;
import br.org.otus.user.signup.exception.SignupPersistenceException;

public interface SignupDataService {
	
	void execute(SignupDataDto signupDataDto) throws SignupException, EmailNotificationException, SignupPersistenceException;
	
}
