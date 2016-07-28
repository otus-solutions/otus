package br.org.otus.user;

import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import br.org.otus.email.validation.EmailConstraint;
import br.org.otus.exceptions.AlreadyExistException;
import br.org.otus.exceptions.InvalidDtoException;
import br.org.otus.user.dto.SignupDataDto;

@RunWith(MockitoJUnitRunner.class)
public class SignupServiceValidationsTest {

	@InjectMocks
	private SignupServiceBean service;

	@Mock
	private EmailConstraint emailConstraint;
	@Mock
	private SignupDataDto signupData;

	@Test
	public void verifyData_should_call_isUnique_method_from_EmailConstraint() throws AlreadyExistException, InvalidDtoException {
		when(signupData.isValid()).thenReturn(true);
		when(emailConstraint.isUnique(anyString())).thenReturn(true);
		
		service.verifyData(signupData);

		verify(emailConstraint).isUnique(signupData.getEmail());
	}

	@Test(expected = AlreadyExistException.class)
	public void verifyData_should_throw_AlreadyExistException_when_email_in_DTO_is_found_in_database() throws AlreadyExistException, InvalidDtoException {
		when(signupData.isValid()).thenReturn(true);
		when(emailConstraint.isUnique(anyString())).thenReturn(false);
		
		service.verifyData(signupData);
	}
	
	@Test
	public void verifyData_should_call_isValid_method_from_SignupDataDto() throws AlreadyExistException, InvalidDtoException {
		when(signupData.isValid()).thenReturn(true);
		when(emailConstraint.isUnique(anyString())).thenReturn(true);
		
		service.verifyData(signupData);

		verify(signupData).isValid();
	}
	
	@Test(expected = InvalidDtoException.class)
	public void verifyData_should_throw_InvalidDtoException_when_DTO_is_invalid() throws AlreadyExistException, InvalidDtoException {
		when(signupData.isValid()).thenReturn(false);
		
		service.verifyData(signupData);
	}

}
