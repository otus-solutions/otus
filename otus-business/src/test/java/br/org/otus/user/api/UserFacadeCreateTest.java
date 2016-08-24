package br.org.otus.user.api;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.email.service.EmailNotifierServiceBean;
import br.org.otus.exceptions.webservice.common.AlreadyExistException;
import br.org.otus.exceptions.webservice.http.EmailNotificationException;
import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.response.builders.ResponseBuild;
import br.org.otus.response.exception.HttpResponseException;
import br.org.otus.response.exception.ResponseInfo;
import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.management.ManagementUserServiceBean;
import br.org.otus.user.signup.SignupServiceBean;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class UserFacadeCreateTest {
    @InjectMocks
    private UserFacade userFacade;

    @Mock
    private EmailNotifierServiceBean emailNotifierServiceBean;

    @Mock
    private ManagementUserServiceBean managementUserServiceBean;

    @Mock
    private SignupServiceBean signupServiceBean;

    @Mock
    private OtusInitializationConfigDto initializationConfigDto;

    @Mock
    private SignupDataDto signupDataDto;

    @Test
    public void method_create_should_verify_if_dto_isValid() {
        Mockito.when(initializationConfigDto.isValid()).thenReturn(Boolean.TRUE);
        userFacade.create(initializationConfigDto);
        Mockito.verify(initializationConfigDto).isValid();
    }

    @Test(expected = HttpResponseException.class)
    public void method_create_should_throw_CommunicationFail_when_EmailNotificationException() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        ResponseInfo errorResponseInfo = ResponseBuild.Email.CommunicationFail.build();
        Mockito.when(initializationConfigDto.isValid()).thenReturn(Boolean.TRUE);
        PowerMockito.doThrow(new EmailNotificationException()).when(signupServiceBean).create(initializationConfigDto);

        try {
            userFacade.create(initializationConfigDto);

        } catch (HttpResponseException e) {
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_create_should_throw_CommunicationFail_when_EncryptedException() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        ResponseInfo errorResponseInfo = ResponseBuild.Email.CommunicationFail.build();
        Mockito.when(initializationConfigDto.isValid()).thenReturn(Boolean.TRUE);
        PowerMockito.doThrow(new EncryptedException()).when(signupServiceBean).create(initializationConfigDto);

        try {
            userFacade.create(initializationConfigDto);

        } catch (HttpResponseException e) {
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_create_should_throw_AlreadyExist_when_AlreadyExistException() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        ResponseInfo errorResponseInfo = ResponseBuild.User.AlreadyExist.build();
        Mockito.when(initializationConfigDto.isValid()).thenReturn(Boolean.TRUE);
        PowerMockito.doThrow(new AlreadyExistException()).when(signupServiceBean).create(initializationConfigDto);

        try {
            userFacade.create(initializationConfigDto);

        } catch (HttpResponseException e) {
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_create_should_throw_SecurityValidation_when_validationIsFail() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        ResponseInfo errorResponseInfo = ResponseBuild.Security.Validation.build();
        Mockito.when(initializationConfigDto.isValid()).thenReturn(Boolean.FALSE);

        try {
            userFacade.create(initializationConfigDto);

        } catch (HttpResponseException e) {
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test
    public void method_create_signup_should_verify_if_dto_isValid() {
        Mockito.when(signupDataDto.isValid()).thenReturn(Boolean.TRUE);
        userFacade.create(signupDataDto);
        Mockito.verify(signupDataDto).isValid();
    }

    @Test(expected = HttpResponseException.class)
    public void method_create_signup_should_throw_CommunicationFail_when_EmailNotificationException() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        ResponseInfo errorResponseInfo = ResponseBuild.Email.CommunicationFail.build();
        Mockito.when(signupDataDto.isValid()).thenReturn(Boolean.TRUE);
        PowerMockito.doThrow(new EmailNotificationException()).when(signupServiceBean).create(signupDataDto);

        try {
            userFacade.create(signupDataDto);

        } catch (HttpResponseException e) {
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_create_signup_should_throw_CommunicationFail_when_EncryptedException() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        ResponseInfo errorResponseInfo = ResponseBuild.Email.CommunicationFail.build();
        Mockito.when(signupDataDto.isValid()).thenReturn(Boolean.TRUE);
        PowerMockito.doThrow(new EncryptedException()).when(signupServiceBean).create(signupDataDto);

        try {
            userFacade.create(signupDataDto);

        } catch (HttpResponseException e) {
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_create_signup_should_throw_AlreadyExist_when_AlreadyExistException() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        ResponseInfo errorResponseInfo = ResponseBuild.User.AlreadyExist.build();
        Mockito.when(signupDataDto.isValid()).thenReturn(Boolean.TRUE);
        PowerMockito.doThrow(new AlreadyExistException()).when(signupServiceBean).create(signupDataDto);

        try {
            userFacade.create(signupDataDto);

        } catch (HttpResponseException e) {
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_create_signup_should_throw_SecurityValidation_when_validationIsFail() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        ResponseInfo errorResponseInfo = ResponseBuild.Security.Validation.build();
        Mockito.when(signupDataDto.isValid()).thenReturn(Boolean.FALSE);

        try {
            userFacade.create(signupDataDto);

        } catch (HttpResponseException e) {
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test
    public void method_list_should_call_managerUser(){
        userFacade.list();
        Mockito.verify(managementUserServiceBean).list();
    }

    private void validateException(HttpResponseException exception, ResponseInfo responseInfo) {
        Assert.assertEquals(exception.getResponseInfo().MESSAGE, responseInfo.MESSAGE);
        Assert.assertEquals(exception.getResponseInfo().STATUS, responseInfo.STATUS);
    }
}
