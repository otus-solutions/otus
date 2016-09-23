package br.org.otus.user.signup;

import br.org.otus.configuration.builder.SystemConfigBuilder;
import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.email.OtusEmailFactory;
import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.email.user.signup.NewUserGreetingsEmail;
import br.org.otus.email.user.signup.NewUserNotificationEmail;
import br.org.otus.exceptions.webservice.common.AlreadyExistException;
import br.org.otus.exceptions.webservice.common.DataNotFoundException;
import br.org.otus.exceptions.webservice.http.EmailNotificationException;
import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.exceptions.webservice.validation.ValidationException;
import br.org.otus.user.User;
import br.org.otus.user.UserDao;
import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.management.ManagementUserService;
import br.org.owail.sender.email.Recipient;
import br.org.owail.sender.email.Sender;
import br.org.tutty.Equalizer;

import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class SignupServiceBean implements SignupService {

    @Inject
    private UserDao userDao;

    @Inject
    private EmailNotifierService emailNotifierService;

    @Inject
    private ManagementUserService managementUserService;

    @Override
    public void create(SignupDataDto signupDataDto) throws EmailNotificationException, DataNotFoundException, AlreadyExistException, ValidationException, EncryptedException {
        if (signupDataDto.isValid()) {
            if (managementUserService.isUnique(signupDataDto.getEmail())) {
                    User user = new User();
                    Equalizer.equalize(signupDataDto, user);
                    Sender sender = emailNotifierService.getSender();

                    sendEmailToUser(user, sender);
                    sendEmailToAdmin(sender, user);
                    userDao.persist(user);

            } else {
                throw new AlreadyExistException();
            }
        } else {
            throw new ValidationException();
        }
    }

    @Override
    public void create(OtusInitializationConfigDto initializationConfigDto) throws AlreadyExistException, EmailNotificationException, EncryptedException, ValidationException {
        if (initializationConfigDto.isValid()) {
            if (managementUserService.isUnique(initializationConfigDto.getEmailSender().getEmail())) {
                User user = SystemConfigBuilder.buildInitialUser(initializationConfigDto);
                emailNotifierService.sendSystemInstallationEmail(initializationConfigDto);
                userDao.persist(user);

            } else {
                throw new AlreadyExistException();
            }
        } else {
            throw new ValidationException();
        }
    }

    private void sendEmailToUser(User user, Sender sender) throws EmailNotificationException {
        Recipient recipient = Recipient.createTO(user.getName(), user.getEmail());
        NewUserGreetingsEmail email = OtusEmailFactory.createNewUserGreetingsEmail(sender, recipient);
        emailNotifierService.sendEmailSync(email);
    }

    private void sendEmailToAdmin(Sender sender, User userToRegister) throws EmailNotificationException {
        User systemAdministrator = userDao.findAdmin();
        Recipient recipient = Recipient.createTO(systemAdministrator.getName(), systemAdministrator.getEmail());
        NewUserNotificationEmail email = OtusEmailFactory.createNewUserNotificationEmail(sender, recipient, userToRegister);
        emailNotifierService.sendEmailSync(email);
    }
}
