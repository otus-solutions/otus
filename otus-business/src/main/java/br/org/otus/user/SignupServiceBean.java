package br.org.otus.user;

import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.email.validation.EmailConstraint;
import br.org.otus.exceptions.AlreadyExistException;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.exceptions.InvalidDtoException;
import br.org.otus.user.dto.SignupDataDto;
import br.org.tutty.Equalizer;

@Stateless
public class SignupServiceBean implements SignupDataService {

	@Inject
	private UserDao userDao;
	@Inject
	private EmailConstraint emailConstraint;
	@Inject
	private EmailNotifierService emailNotifierService;

	@Override
	public void verifyData(SignupDataDto signupData) throws AlreadyExistException, InvalidDtoException {
		if (!signupData.isValid()) {
			throw new InvalidDtoException();
		}

		if (!emailConstraint.isUnique(signupData.getEmail())) {
			throw new AlreadyExistException();
		}
	}

	@Override
	public void sendWelcomeEmail() throws EmailNotificationException, DataNotFoundException {
//		emailNotifierService.sendWelcomeEmail(emailSender);
	}

	@Override
	public void executeRegistration(SignupDataDto signupDataDto) {
		User user = new User();
		Equalizer.equalize(signupDataDto, user);
		userDao.persist(user);
	}

}
