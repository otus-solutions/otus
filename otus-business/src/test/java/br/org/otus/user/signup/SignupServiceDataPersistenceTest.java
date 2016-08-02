package br.org.otus.user.signup;

import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.powermock.api.mockito.PowerMockito.doThrow;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.verifyStatic;
import static org.powermock.api.mockito.PowerMockito.whenNew;

import javax.persistence.PersistenceException;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import br.org.otus.email.OtusEmailFactory;
import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.email.user.signup.NewUserNotificationEmail;
import br.org.otus.email.validation.EmailConstraint;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.system.SystemConfigDao;
import br.org.otus.user.User;
import br.org.otus.user.UserDao;
import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.signup.exception.SignupException;
import br.org.owail.sender.email.Recipient;
import br.org.owail.sender.email.Sender;
import br.org.tutty.Equalizer;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ SignupServiceBean.class, Equalizer.class, OtusEmailFactory.class })
public class SignupServiceDataPersistenceTest {

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
    
    @Mock
    private User userToRegister;
    @Mock
    private Sender sender;
    @Mock
    private Recipient recipient;
    @Mock
    private User admin;

    @Before
    public void setup() throws Exception {
        when(userDao.findAdmin()).thenReturn(admin);

        verifyDataProcedure();
        notifyAdministratorProcedure();

        mockStatic(Equalizer.class);
    }

    @Test
    public void persistNewUserData_method_should_transpose_dto_data_to_user_entity() throws SignupException, EmailNotificationException {
        service.execute(signupData);

        verifyStatic();
        Equalizer.equalize(Mockito.any(), Mockito.any());
    }

    @Test
    public void persistNewUserData_method_should_persist_user_entity() throws Exception {
        whenNew(User.class).withNoArguments().thenReturn(userToRegister);

        service.execute(signupData);

        verify(userDao).persist(userToRegister);
    }

    @Test
    public void persistNewUserData_method_should_throw_an_exception_when_data_persistence_fail() throws SignupException,
            EmailNotificationException {
        doThrow(new PersistenceException()).when(userDao).persist(userToRegister);

        service.execute(signupData);
    }

    private void verifyDataProcedure() {
        when(signupData.isValid()).thenReturn(true);
        when(emailConstraint.isUnique(anyString())).thenReturn(true);
    }

    private void notifyAdministratorProcedure() throws Exception {
        mockStatic(OtusEmailFactory.class);
        when(OtusEmailFactory.createNewUserNotificationEmail(sender, recipient, userToRegister)).thenReturn(email);
    }

}
