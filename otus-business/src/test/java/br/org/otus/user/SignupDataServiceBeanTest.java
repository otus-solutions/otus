package br.org.otus.user;

import org.hamcrest.CoreMatchers;
import org.hamcrest.MatcherAssert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.user.dtos.SignupDataDto;

@RunWith(MockitoJUnitRunner.class)
public class SignupDataServiceBeanTest {

    @InjectMocks
    private SignupDataServiceBean service;

    @Mock
    private UserDao userDao;

    private SignupDataDto signupData;

    @Before
    public void setup() {
        createSignupData();
    }

    @Test
    @SuppressWarnings("unchecked")
    public void executeRegistration_method_should_return_TRUE_when_registration_is_completed_successfully() throws DataNotFoundException {
        Mockito.when(userDao.fetchByEmail(signupData.getEmail())).thenThrow(DataNotFoundException.class);

        MatcherAssert.assertThat(service.executeRegistration(signupData), CoreMatchers.equalTo(true));
    }

    @Test
    public void executeRegistration_method_should_return_FALSE_when_email_already_exists() {
        MatcherAssert.assertThat(service.executeRegistration(signupData), CoreMatchers.equalTo(false));
    }
    
    @Test
    public void executeRegistration_method_should_return_FALSE_when_password_is_not_confirmed() {
        signupData.setPasswordConfirmation("password");
        
        MatcherAssert.assertThat(service.executeRegistration(signupData), CoreMatchers.equalTo(false));
    }
    
    @Test
    public void executeRegistration_method_should_return_FALSE_when_any_data_field_is_empty() {
        signupData.setEmail("");
        
        MatcherAssert.assertThat(service.executeRegistration(signupData), CoreMatchers.equalTo(false));
    }

    @Test
    @SuppressWarnings("unchecked")
    public void executeRegistration_method_should_call_UserDao_insert_method() throws DataNotFoundException {
        Mockito.when(userDao.fetchByEmail(signupData.getEmail())).thenThrow(DataNotFoundException.class);
        
        service.executeRegistration(signupData);

        Mockito.verify(userDao).persist(Mockito.any());
    }

    private void createSignupData() {
        signupData = new SignupDataDto();
        signupData.setPhone("5192898863");
        signupData.setEmail("user@email.com");
        signupData.setName("Name");
        signupData.setPassword("password");
        signupData.setPasswordConfirmation("password");
        signupData.setSurname("Surname");
    }

}
