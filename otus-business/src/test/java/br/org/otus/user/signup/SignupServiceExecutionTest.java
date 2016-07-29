package br.org.otus.user.signup;

import static org.mockito.Mockito.when;
import static org.powermock.api.mockito.PowerMockito.doThrow;

import javax.persistence.PersistenceException;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.email.validation.EmailConstraint;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.user.User;
import br.org.otus.user.UserDao;
import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.signup.SignupServiceBean;
import br.org.otus.user.signup.exception.SignupException;
import br.org.owail.sender.email.Sender;

@RunWith(MockitoJUnitRunner.class)
public class SignupServiceExecutionTest {

    @InjectMocks
    private SignupServiceBean service;

    @Mock
    private EmailConstraint emailConstraint;
    @Mock
    private EmailNotifierService emailNotifierService;
    @Mock
    private UserDao userDao;
    @Mock
    private SignupDataDto signupData;
    @Mock
    private User admin;
    @Mock
    private User userToRegister;
    @Mock
    private Sender sender;

    @Test(expected = SignupException.class)
    public void execute_method_should_throw_an_SignupException_when_data_validation_fail() throws SignupException, EmailNotificationException {
        when(signupData.isValid()).thenReturn(false);
        
        service.execute(signupData);
    }
    
    @SuppressWarnings("unchecked")
    @Test(expected = SignupException.class)
    public void execute_method_should_throw_an_SignupException_when_email_notificarion_fail() throws SignupException, DataNotFoundException {
        when(signupData.isValid()).thenReturn(true);
        when(emailConstraint.isUnique(signupData.getEmail())).thenReturn(true);
        when(userDao.findAdmin()).thenThrow(DataNotFoundException.class);
        
        service.execute(signupData);
    }

    // TODO: Find the right way to do this test
    @SuppressWarnings("unchecked")
    @Ignore
    @Test(expected = SignupException.class)
    public void execute_method_should_throw_an_SignupException_when_data_persistence_fail() throws SignupException, DataNotFoundException {
        when(signupData.isValid()).thenReturn(true);
        when(emailConstraint.isUnique(signupData.getEmail())).thenReturn(true);
        when(userDao.findAdmin()).thenReturn(admin);
        when(emailNotifierService.getSender()).thenReturn(sender);
        when(userDao.fetchByEmail(userToRegister.getEmail())).thenThrow(DataNotFoundException.class);
        doThrow(new PersistenceException()).when(userDao).persist(userToRegister);
        
        service.execute(signupData);
    }

}
