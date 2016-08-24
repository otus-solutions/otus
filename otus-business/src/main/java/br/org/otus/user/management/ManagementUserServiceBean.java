package br.org.otus.user.management;

import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.email.user.management.DisableUserNotificationEmail;
import br.org.otus.email.user.management.EnableUserNotificationEmail;
import br.org.otus.exceptions.webservice.http.EmailNotificationException;
import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.user.User;
import br.org.otus.user.UserDao;
import br.org.otus.user.api.UserFacade;
import br.org.otus.user.dto.ManagementUserDto;
import br.org.tutty.Equalizer;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@Stateless
public class ManagementUserServiceBean implements ManagementUserService {
    @Inject
    private UserDao userDao;

    @Inject
    private EmailNotifierService emailNotifierService;

    @Override
    public User fetchByEmail(String email) {
        return userDao.fetchByEmail(email);
    }

    @Override
    public void enable(ManagementUserDto managementUserDto) throws EmailNotificationException, EncryptedException {
        User user = fetchByEmail(managementUserDto.getEmail());
        user.enable();

        userDao.update(user);

        EnableUserNotificationEmail enableUserNotificationEmail = new EnableUserNotificationEmail();
        enableUserNotificationEmail.defineRecipient(user);
        enableUserNotificationEmail.setFrom(emailNotifierService.getSender());
        emailNotifierService.sendEmail(enableUserNotificationEmail);
    }

    @Override
    public void disable(ManagementUserDto managementUserDto) throws EmailNotificationException, EncryptedException {
        User user = fetchByEmail(managementUserDto.getEmail());

        if (!user.isAdmin()) {
            user.disable();

            userDao.update(user);

            DisableUserNotificationEmail disableUserNotificationEmail = new DisableUserNotificationEmail();
            disableUserNotificationEmail.defineRecipient(user);
            disableUserNotificationEmail.setFrom(emailNotifierService.getSender());
            emailNotifierService.sendEmail(disableUserNotificationEmail);
        }
    }

    @Override
    public Boolean isUnique(String emailToVerify) {
        if (emailToVerify != null && userDao.emailExists(emailToVerify)) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public List<ManagementUserDto> list() {
        List<ManagementUserDto> administrationUsersDtos = new ArrayList<>();
        List<User> users = userDao.fetchAll();

        users.stream().forEach(user -> {
            ManagementUserDto managementUserDto = new ManagementUserDto();

            Equalizer.equalize(user, managementUserDto);
            administrationUsersDtos.add(managementUserDto);
        });

        return administrationUsersDtos;
    }
}
