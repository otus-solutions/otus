package br.org.otus.user.signup;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.exceptions.webservice.common.AlreadyExistException;
import br.org.otus.exceptions.webservice.common.DataNotFoundException;
import br.org.otus.exceptions.webservice.http.EmailNotificationException;
import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.exceptions.webservice.validation.ValidationException;
import br.org.otus.user.dto.SignupDataDto;

public interface SignupService {

    void create(SignupDataDto signupDataDto) throws AlreadyExistException, EncryptedException, EmailNotificationException, DataNotFoundException, ValidationException;

    void create(OtusInitializationConfigDto initializationConfigDto) throws AlreadyExistException, EmailNotificationException, EncryptedException, ValidationException;
}
