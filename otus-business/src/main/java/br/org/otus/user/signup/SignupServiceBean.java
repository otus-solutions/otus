package br.org.otus.user.signup;

import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.otus.email.NewUserNotificationEmail;
import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.email.validation.EmailConstraint;
import br.org.otus.exceptions.AlreadyExistException;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.exceptions.InvalidDtoException;
import br.org.otus.user.User;
import br.org.otus.user.UserDao;
import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.signup.exception.SignupException;
import br.org.otus.user.signup.exception.SignupPersistenceException;
import br.org.otus.user.signup.exception.SignupValidationException;
import br.org.owail.sender.email.Sender;
import br.org.tutty.Equalizer;

@Stateless
public class SignupServiceBean implements SignupDataService {

    @Inject
    private EmailConstraint emailConstraint;
    @Inject
    private EmailNotifierService emailNotifierService;
    @Inject
    private UserDao userDao;

    @Override
    public void execute(SignupDataDto signupData) throws SignupException {
        verifyData(signupData);
        User userToRegister = new User();
        
        try {
            notifyAdministrator(userToRegister);
        } catch (EmailNotificationException e) {
            throw new SignupException(e);
        }
        
        persistNewUserData(signupData, userToRegister);
    }

    private void verifyData(SignupDataDto signupData) throws SignupValidationException {
        if (!signupData.isValid()) {
            throw new SignupValidationException(new InvalidDtoException());
        }

        if (!emailConstraint.isUnique(signupData.getEmail())) {
            throw new SignupValidationException(new AlreadyExistException());
        }
    }

    private void notifyAdministrator(User userToRegister) throws EmailNotificationException {
        User admin = null;
        Sender sender = null;

        try {
            admin = userDao.findAdmin();
            sender = emailNotifierService.getSender();
        } catch (DataNotFoundException e) {
            throw new EmailNotificationException(e);
        }

        NewUserNotificationEmail newUserNotificationEmail = new NewUserNotificationEmail(userToRegister);
        newUserNotificationEmail.defineAdminRecipient(admin);
        newUserNotificationEmail.setFrom(sender);

        emailNotifierService.sendEmail(newUserNotificationEmail);
    }

    private void persistNewUserData(SignupDataDto signupData, User userToRegister) throws SignupPersistenceException {
        try {
            Equalizer.equalize(signupData, userToRegister);
            userDao.persist(userToRegister);
        } catch(Exception e) {
            throw new SignupPersistenceException(e);
        }
    }

}
