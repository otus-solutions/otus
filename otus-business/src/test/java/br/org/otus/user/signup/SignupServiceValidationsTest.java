package br.org.otus.user.signup;

import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.powermock.api.mockito.PowerMockito.mockStatic;

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
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.system.SystemConfigDao;
import br.org.otus.user.User;
import br.org.otus.user.UserDao;
import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.signup.exception.SignupException;
import br.org.otus.user.signup.exception.SignupValidationException;
import br.org.owail.sender.email.Recipient;
import br.org.owail.sender.email.Sender;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ SignupServiceBean.class, OtusEmailFactory.class })
public class SignupServiceValidationsTest {

    @InjectMocks
    private SignupServiceBean service;

    @Mock
    private EmailConstraint emailConstraint;
    @Mock
    private EmailNotifierService emailNotifierService;
    @Mock
    private SignupDataDto signupData;

    @Mock
    private UserDao userDao;
    @Mock
    private SystemConfigDao systemConfigDao;

    @Mock
    private NewUserGreetingsEmail greetingsEmail;
    @Mock
    private NewUserNotificationEmail notificationEmail;

    @Mock
    private Sender sender;
    @Mock
    private Recipient recipient;
    @Mock
    private User user;

    @Before
    public void setup() throws Exception {
        mockStatic(OtusEmailFactory.class);
        when(OtusEmailFactory.createNewUserGreetingsEmail(sender, recipient)).thenReturn(greetingsEmail);
        when(OtusEmailFactory.createNewUserNotificationEmail(sender, recipient, user)).thenReturn(notificationEmail);

        when(userDao.findAdmin()).thenReturn(user);
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
