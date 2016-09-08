package br.org.otus.user.api;

import br.org.otus.email.service.EmailNotifierServiceBean;
import br.org.otus.exceptions.webservice.common.AlreadyExistException;
import br.org.otus.exceptions.webservice.common.DataNotFoundException;
import br.org.otus.exceptions.webservice.http.EmailNotificationException;
import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.exceptions.webservice.validation.ValidationException;
import br.org.otus.response.builders.ResponseBuild;
import br.org.otus.response.exception.HttpResponseException;
import br.org.otus.response.exception.ResponseInfo;
import br.org.otus.user.dto.ManagementUserDto;
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
public class UserFacadeAccessControlTest {
    @InjectMocks
    private UserFacade userFacade;

    @Mock
    private EmailNotifierServiceBean emailNotifierServiceBean;

    @Mock
    private ManagementUserServiceBean managementUserServiceBean;

    @Mock
    private SignupServiceBean signupServiceBean;

    @Mock
    private ManagementUserDto managementUserDto;

    @Mock
    private SignupDataDto signupDataDto;

    @Test(expected = HttpResponseException.class)
    public void method_disable_should_throw_securityValidation_when_dto_is_not_valid() throws EmailNotificationException, EncryptedException, AlreadyExistException, ValidationException, DataNotFoundException {
        ResponseInfo errorResponseInfo = ResponseBuild.Security.Validation.build();
        Mockito.doThrow(ValidationException.class).when(managementUserServiceBean).disable(managementUserDto);

        try {
            userFacade.disable(managementUserDto);

        } catch (HttpResponseException e) {
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_disable_should_throw_EmailCommunication_when_EncryptedException() throws EmailNotificationException, EncryptedException, AlreadyExistException, ValidationException, DataNotFoundException {
        ResponseInfo errorResponseInfo = ResponseBuild.Email.CommunicationFail.build();
        Mockito.when(managementUserDto.isValid()).thenReturn(Boolean.TRUE);
        PowerMockito.doThrow(new EncryptedException()).when(managementUserServiceBean).disable(managementUserDto);

        try {
            userFacade.disable(managementUserDto);

        } catch (HttpResponseException e) {
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_disable_should_throw_EmailCommunication_when_EmailNotificationException() throws EmailNotificationException, EncryptedException, AlreadyExistException, ValidationException, DataNotFoundException {
        ResponseInfo errorResponseInfo = ResponseBuild.Email.CommunicationFail.build();
        Mockito.when(managementUserDto.isValid()).thenReturn(Boolean.TRUE);
        PowerMockito.doThrow(new EmailNotificationException()).when(managementUserServiceBean).disable(managementUserDto);

        try {
            userFacade.disable(managementUserDto);

        } catch (HttpResponseException e) {
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_enable_should_throw_EmailCommunication_when_EncryptedException() throws EmailNotificationException, EncryptedException, AlreadyExistException, ValidationException, DataNotFoundException {
        ResponseInfo errorResponseInfo = ResponseBuild.Email.CommunicationFail.build();
        Mockito.when(managementUserDto.isValid()).thenReturn(Boolean.TRUE);
        PowerMockito.doThrow(new EncryptedException()).when(managementUserServiceBean).enable(managementUserDto);

        try {
            userFacade.enable(managementUserDto);

        } catch (HttpResponseException e) {
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_enable_should_throw_EmailCommunication_when_EmailNotificationException() throws EmailNotificationException, EncryptedException, AlreadyExistException, ValidationException, DataNotFoundException {
        ResponseInfo errorResponseInfo = ResponseBuild.Email.CommunicationFail.build();
        Mockito.when(managementUserDto.isValid()).thenReturn(Boolean.TRUE);
        PowerMockito.doThrow(new EmailNotificationException()).when(managementUserServiceBean).enable(managementUserDto);

        try {
            userFacade.enable(managementUserDto);

        } catch (HttpResponseException e) {
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_enable_should_throw_securityValidation_when_dto_is_not_valid() throws EmailNotificationException, EncryptedException, AlreadyExistException, ValidationException, DataNotFoundException {
        ResponseInfo errorResponseInfo = ResponseBuild.Security.Validation.build();
        Mockito.doThrow(ValidationException.class).when(managementUserServiceBean).enable(managementUserDto);

        try {
            userFacade.enable(managementUserDto);

        } catch (HttpResponseException e) {
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    private void validateException(HttpResponseException exception, ResponseInfo responseInfo) {
        Assert.assertEquals(exception.getResponseInfo().MESSAGE, responseInfo.MESSAGE);
        Assert.assertEquals(exception.getResponseInfo().STATUS, responseInfo.STATUS);
    }

}
