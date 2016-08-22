package br.org.otus.user.signup;

import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.otus.email.OtusEmailFactory;
import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.email.user.signup.NewUserGreetingsEmail;
import br.org.otus.email.user.signup.NewUserNotificationEmail;
import br.org.otus.email.validation.EmailConstraint;
import br.org.otus.exceptions.AlreadyExistException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.exceptions.InvalidDtoException;
import br.org.otus.user.User;
import br.org.otus.user.UserDao;
import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.signup.exception.SignupException;
import br.org.otus.user.signup.exception.SignupPersistenceException;
import br.org.otus.user.signup.exception.SignupValidationException;
import br.org.owail.sender.email.Recipient;
import br.org.owail.sender.email.Sender;
import br.org.tutty.Equalizer;

@Stateless
public class SignupServiceBean implements SignupService {

    @Inject
    private EmailConstraint emailConstraint;
    @Inject
    private EmailNotifierService emailNotifierService;
    @Inject
    private UserDao userDao;

    private Sender sender;

    @Override
    public void execute(SignupDataDto signupData) throws SignupException {
        loadServiceResources();
        verifyData(signupData);

        User userToRegister = new User();
        Equalizer.equalize(signupData, userToRegister);

        try {
            notifyAdministrator(userToRegister);
        } catch (EmailNotificationException e) {
            throw new SignupException(e);
        }

        persistNewUserData(userToRegister);
    }

    private void loadServiceResources() throws SignupException {
        try {
            sender = emailNotifierService.getSender();
        } catch (Exception e) {
            throw new SignupException();
        }
    }

    private void verifyData(SignupDataDto signupData) throws SignupValidationException {
        if (!signupData.isValid()) {
            throw new SignupValidationException(new InvalidDtoException());
        }

        if (!emailConstraint.isUnique(signupData.getEmail())) {
            throw new SignupValidationException(new AlreadyExistException());
        }

        try {
            Recipient recipient = Recipient.createTO(signupData.getName(), signupData.getEmail());
            NewUserGreetingsEmail email = OtusEmailFactory.createNewUserGreetingsEmail(sender, recipient);
            emailNotifierService.sendEmailSync(email);
        } catch (Exception e) {
            throw new SignupValidationException(e);
        }
    }

    private void notifyAdministrator(User userToRegister) throws EmailNotificationException {
        try {
            User systemAdministrator = userDao.findAdmin();
            Recipient recipient = Recipient.createTO(systemAdministrator.getName(), systemAdministrator.getEmail());
            NewUserNotificationEmail email = OtusEmailFactory.createNewUserNotificationEmail(sender, recipient, userToRegister);
            emailNotifierService.sendEmail(email);
        } catch (Exception e) {
            throw new EmailNotificationException();
        }
    }

    private void persistNewUserData(User userToRegister) throws SignupPersistenceException {
        try {
            userDao.persist(userToRegister);
        } catch (Exception e) {
            throw new SignupPersistenceException(e);
        }
    }

}
