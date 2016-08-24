package br.org.otus.user.management;

import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.email.service.EmailNotifierServiceBean;
import br.org.otus.email.user.management.DisableUserNotificationEmail;
import br.org.otus.email.user.management.EnableUserNotificationEmail;
import br.org.otus.exceptions.webservice.http.EmailNotificationException;
import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.exceptions.webservice.validation.ValidationException;
import br.org.otus.user.User;
import br.org.otus.user.UserDao;
import br.org.otus.user.api.UserFacade;
import br.org.otus.user.dto.ManagementUserDto;
import br.org.owail.sender.email.Sender;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ManagementUserServiceBean.class})
public class ManagementUserServiceBeanTest {

    private static final String EMAIL = "email@email";
    @InjectMocks
    private ManagementUserServiceBean managementUserServiceBean;

    @Mock
    private UserDao userDao;

    @Mock
    private EmailNotifierService emailNotifierService;

    @Mock
    private ManagementUserDto managementUserDto;

    @Mock
    private User user;

    @Mock
    private Sender sender;

    @Mock
    private EnableUserNotificationEmail enableUserNotification;

    @Mock
    private DisableUserNotificationEmail disableUserNotification;

    @Test
    public void method_enable_should_fetch_user_by_email() throws EmailNotificationException, EncryptedException {
        Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
        Mockito.when(managementUserDto.getEmail()).thenReturn(EMAIL);
        managementUserServiceBean.enable(managementUserDto);
        Mockito.verify(userDao).fetchByEmail(EMAIL);
    }

    @Test
    public void method_enable_should_change_status_to_enable() throws EmailNotificationException, EncryptedException {
        Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
        Mockito.when(managementUserDto.getEmail()).thenReturn(EMAIL);
        managementUserServiceBean.enable(managementUserDto);
        Mockito.verify(user).enable();
    }

    @Test
    public void method_enable_should_update_user() throws EmailNotificationException, EncryptedException {
        Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
        Mockito.when(managementUserDto.getEmail()).thenReturn(EMAIL);
        managementUserServiceBean.enable(managementUserDto);
        Mockito.verify(userDao).update(user);
    }

    @Test
    public void method_enable_should_send_email_to_user() throws Exception {
        PowerMockito.whenNew(EnableUserNotificationEmail.class).withNoArguments().thenReturn(enableUserNotification);
        Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
        Mockito.when(managementUserDto.getEmail()).thenReturn(EMAIL);
        Mockito.when(emailNotifierService.getSender()).thenReturn(sender);

        managementUserServiceBean.enable(managementUserDto);
        Mockito.verify(emailNotifierService).sendEmail(enableUserNotification);
    }

    @Test
    public void method_disable_should_fetch_user_by_email() throws EmailNotificationException, EncryptedException {
        Mockito.when(user.isAdmin()).thenReturn(Boolean.FALSE);
        Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
        Mockito.when(managementUserDto.getEmail()).thenReturn(EMAIL);
        managementUserServiceBean.disable(managementUserDto);
        Mockito.verify(userDao).fetchByEmail(EMAIL);
    }

    @Test
    public void method_disable_should_change_status_to_enable() throws EmailNotificationException, EncryptedException {
        Mockito.when(user.isAdmin()).thenReturn(Boolean.FALSE);
        Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
        Mockito.when(managementUserDto.getEmail()).thenReturn(EMAIL);
        managementUserServiceBean.disable(managementUserDto);
        Mockito.verify(user).disable();
    }

    @Test
    public void method_disable_should_update_user() throws EmailNotificationException, EncryptedException {
        Mockito.when(user.isAdmin()).thenReturn(Boolean.FALSE);
        Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
        Mockito.when(managementUserDto.getEmail()).thenReturn(EMAIL);
        managementUserServiceBean.disable(managementUserDto);
        Mockito.verify(userDao).update(user);
    }

    @Test
    public void method_disable_should_send_email_to_user() throws Exception {
        Mockito.when(user.isAdmin()).thenReturn(Boolean.FALSE);
        PowerMockito.whenNew(DisableUserNotificationEmail.class).withNoArguments().thenReturn(disableUserNotification);
        Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
        Mockito.when(managementUserDto.getEmail()).thenReturn(EMAIL);
        Mockito.when(emailNotifierService.getSender()).thenReturn(sender);

        managementUserServiceBean.disable(managementUserDto);
        Mockito.verify(emailNotifierService).sendEmail(disableUserNotification);
    }

    @Test
    public void method_disable_should_verify_if_is_admin() throws EmailNotificationException, EncryptedException {
        Mockito.when(managementUserDto.getEmail()).thenReturn(EMAIL);
        Mockito.when(user.isAdmin()).thenReturn(Boolean.TRUE);
        Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
        managementUserServiceBean.disable(managementUserDto);
        Mockito.verify(user).isAdmin();
        Mockito.verify(userDao, Mockito.never()).update(user);
    }
}
