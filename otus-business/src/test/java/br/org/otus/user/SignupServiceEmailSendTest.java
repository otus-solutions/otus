package br.org.otus.user;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.verify;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import br.org.otus.email.dto.EmailSenderDto;
import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;

@RunWith(MockitoJUnitRunner.class)
public class SignupServiceEmailSendTest {

	@InjectMocks
	private SignupServiceBean service;

	@Mock
	private EmailNotifierService emailNotifierService;

	@Test
	public void sendWelcomeEmail_method_should_call_sendWelcomeEmail_method_from_EmailNotifierService() throws EmailNotificationException, DataNotFoundException {
		service.sendWelcomeEmail();

		verify(emailNotifierService).sendWelcomeEmail(any(EmailSenderDto.class));
	}

}
