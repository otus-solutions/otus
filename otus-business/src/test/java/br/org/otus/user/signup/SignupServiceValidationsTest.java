package br.org.otus.user.signup;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
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
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.system.SystemConfigDao;
import br.org.otus.user.User;
import br.org.otus.user.UserDao;
import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.signup.SignupServiceBean;
import br.org.otus.user.signup.exception.SignupException;
import br.org.otus.user.signup.exception.SignupValidationException;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ SignupServiceBean.class })
public class SignupServiceValidationsTest {

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
        whenNew(NewUserNotificationEmail.class).withArguments(any(User.class)).thenReturn(email);
    }

    @Test
    public void verifyData_should_grant_that_email_is_unique() throws SignupException, EmailNotificationException {
        when(signupData.isValid()).thenReturn(true);
        when(emailConstraint.isUnique(anyString())).thenReturn(true);

        service.execute(signupData);

        verify(emailConstraint).isUnique(signupData.getEmail());
    }

    @Test(expected = SignupValidationException.class)
    public void verifyData_should_throw_an_exception_if_email_is_not_unique() throws SignupException, EmailNotificationException {
        when(signupData.isValid()).thenReturn(true);
        when(emailConstraint.isUnique(anyString())).thenReturn(false);

        service.execute(signupData);
    }

    @Test
    public void verifyData_should_verify_if_dto_is_valid() throws SignupException, EmailNotificationException {
        when(signupData.isValid()).thenReturn(true);
        when(emailConstraint.isUnique(anyString())).thenReturn(true);

        service.execute(signupData);

        verify(signupData).isValid();
    }

    @Test(expected = SignupValidationException.class)
    public void verifyData_should_throw_an_exception_when_DTO_is_invalid() throws SignupException, EmailNotificationException {
        when(signupData.isValid()).thenReturn(false);

        service.execute(signupData);
    }

}
