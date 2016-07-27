package br.org.otus.user;

import br.org.otus.exceptions.AlreadyExistException;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.exceptions.InvalidDtoException;
import br.org.otus.user.dtos.SignupDataDto;

public interface SignupDataService {
	
	void verifyData(SignupDataDto signupData) throws AlreadyExistException, InvalidDtoException;
	
	void sendWelcomeEmail() throws EmailNotificationException, DataNotFoundException;
	
	void executeRegistration(SignupDataDto signupDataDto);
	
}
