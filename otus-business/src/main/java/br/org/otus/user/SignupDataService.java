package br.org.otus.user;

import br.org.otus.user.dtos.SignupDataDto;

public interface SignupDataService {
	
	Boolean executeRegistration(SignupDataDto signupDataDto);
	
}
