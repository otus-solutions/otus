package br.org.otus.user.signup;

import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.signup.exception.SignupException;

public interface SignupService {
	
	void execute(SignupDataDto signupDataDto) throws SignupException;
	
}
