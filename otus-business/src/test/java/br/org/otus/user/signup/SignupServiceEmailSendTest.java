package br.org.otus.user.signup;

import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.whenNew;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import br.org.otus.email.OtusEmailFactory;
import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.email.user.signup.NewUserGreetingsEmail;
import br.org.otus.email.user.signup.NewUserNotificationEmail;
import br.org.otus.email.validation.EmailConstraint;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.system.SystemConfigDao;
import br.org.otus.user.User;
import br.org.otus.user.UserDao;
import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.signup.exception.SignupException;
import br.org.owail.sender.email.Recipient;
import br.org.owail.sender.email.Sender;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ SignupServiceBean.class, OtusEmailFactory.class, Recipient.class })
public class SignupServiceEmailSendTest {

    @InjectMocks
    private SignupServiceBean service;

    @Mock
    private EmailConstraint emailConstraint;
    @Mock
    private EmailNotifierService emailNotifierService;
    @Mock
    private SignupDataDto signupData;

    @Mock
    private SystemConfigDao systemConfigDao;
    @Mock
    private UserDao userDao;

    @Mock
    private NewUserGreetingsEmail greetingsEmail;
    @Mock
    private NewUserNotificationEmail notificationEmail;

    @Mock
    private Sender sender;
    @Mock
    private Recipient recipient;
    @Mock
    private User userToRegister;
    @Mock
    private User admin;

    @Before
    public void setup() throws Exception {
        whenNew(User.class).withNoArguments().thenReturn(userToRegister);
        when(emailNotifierService.getSender()).thenReturn(sender);
        when(userDao.findAdmin()).thenReturn(admin);
        
        mockStatic(Recipient.class);
        when(Recipient.createTO(admin.getName(), admin.getEmail())).thenReturn(recipient);
        
        mockStatic(OtusEmailFactory.class);
        when(OtusEmailFactory.createNewUserGreetingsEmail(sender, recipient)).thenReturn(greetingsEmail);
        when(OtusEmailFactory.createNewUserNotificationEmail(sender, recipient, userToRegister)).thenReturn(notificationEmail);

        verifyDataProcedure();        
    }

    @Test
    public void notifyAdministrator_method_should_get_adm_information() throws SignupException, EmailNotificationException, DataNotFoundException {
        service.execute(signupData);

        verify(userDao).findAdmin();
    }

    @Test
    public void notifyAdministrator_method_should_get_email_sender_information() throws SignupException, EmailNotificationException, DataNotFoundException {
        service.execute(signupData);

        verify(emailNotifierService).getSender();
    }

    @Test
    public void notifyAdministrator_method_should_send_email_to_administrator_with_new_user_data() throws SignupException, EmailNotificationException {
        service.execute(signupData);

        verify(emailNotifierService).sendEmail(notificationEmail);
    }

    @SuppressWarnings("unchecked")
    @Test(expected = SignupException.class)
    public void notifyAdministrator_method_should_throw_an_exception_when_administrator_is_not_found() throws SignupException, DataNotFoundException {
        when(userDao.findAdmin()).thenThrow(DataNotFoundException.class);

        service.execute(signupData);
    }

    @SuppressWarnings("unchecked")
    @Test(expected = SignupException.class)
    public void notifyAdministrator_method_should_throw_an_exception_when_sender_data_is_not_found() throws SignupException, DataNotFoundException {
        when(emailNotifierService.getSender()).thenThrow(DataNotFoundException.class);

        service.execute(signupData);
    }

    @Test(expected = SignupException.class)
    public void notifyAdministrator_method_should_throw_an_exception_when_email_send_generate_error() throws SignupException, EmailNotificationException {
        doThrow(EmailNotificationException.class).when(emailNotifierService).sendEmail(notificationEmail);

        service.execute(signupData);
    }

    private void verifyDataProcedure() {
        when(signupData.isValid()).thenReturn(true);
        when(emailConstraint.isUnique(anyString())).thenReturn(true);
    }

}
