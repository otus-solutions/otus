package br.org.otus.user;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.powermock.api.mockito.PowerMockito.whenNew;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import br.org.otus.email.NewUserNotificationEmail;
import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.email.validation.EmailConstraint;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.system.SystemConfigDao;
import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.signup.SignupServiceBean;
import br.org.otus.user.signup.exception.SignupException;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ SignupServiceBean.class })
public class SignupServiceEmailSendTest {

    @InjectMocks
    private SignupServiceBean service;

    @Mock
    private EmailConstraint emailConstraint;
    @Mock
    private EmailNotifierService emailNotifierService;
    @Mock
    private SystemConfigDao systemConfigDao;
    @Mock
    private SignupDataDto signupData;
    @Mock
    private UserDao userDao;
    @Mock
    private NewUserNotificationEmail email;

    @Before
    public void setup() throws Exception {
        verifyDataProcedure();

        whenNew(NewUserNotificationEmail.class).withArguments(any(User.class)).thenReturn(email);
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

        verify(emailNotifierService).sendEmail(email);
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
        doThrow(EmailNotificationException.class).when(emailNotifierService).sendEmail(email);

        service.execute(signupData);
    }

    private void verifyDataProcedure() {
        when(signupData.isValid()).thenReturn(true);
        when(emailConstraint.isUnique(anyString())).thenReturn(true);
    }

}
