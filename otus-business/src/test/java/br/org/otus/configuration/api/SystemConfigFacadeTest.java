package br.org.otus.configuration.api;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.configuration.service.SystemConfigServiceBean;
import br.org.otus.email.service.EmailNotifierServiceBean;
import br.org.otus.exceptions.webservice.common.AlreadyExistException;
import br.org.otus.exceptions.webservice.http.EmailNotificationException;
import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.response.builders.ResponseBuild;
import br.org.otus.response.exception.HttpResponseException;
import br.org.otus.response.exception.ResponseInfo;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class SystemConfigFacadeTest {

    private static final String TOKEN_DUMMY = "TOKEN_DUMMY";

    @InjectMocks
    private SystemConfigFacade systemConfigFacade;

    @Mock
    private SystemConfigServiceBean systemConfigServiceBean;

    @Mock
    private EmailNotifierServiceBean emailNotifierServiceBean;

    @Mock
    private OtusInitializationConfigDto initializationConfigDto;

    @Test(expected = HttpResponseException.class)
    public void method_initConfiguraton_should_throw_CommunicationFail_when_sending_email_fail() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        ResponseInfo errorResponseInfo = ResponseBuild.Email.CommunicationFail.build();
        Mockito.doThrow(new EmailNotificationException()).when(systemConfigServiceBean).initConfiguration(initializationConfigDto, TOKEN_DUMMY);

        try{
            systemConfigFacade.initConfiguration(initializationConfigDto, TOKEN_DUMMY);

        }catch (HttpResponseException e){
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_initConfiguraton_should_throw_CommunicationFail_when_sending_email_fail_encrypt() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        ResponseInfo errorResponseInfo = ResponseBuild.Email.CommunicationFail.build();
        Mockito.doThrow(new EncryptedException()).when(systemConfigServiceBean).initConfiguration(initializationConfigDto, TOKEN_DUMMY);

        try{
            systemConfigFacade.initConfiguration(initializationConfigDto, TOKEN_DUMMY);

        }catch (HttpResponseException e){
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_initConfiguraton_should_throw_AlreadyExist_when_throw_AlreadyExistException() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        ResponseInfo errorResponseInfo = ResponseBuild.User.AlreadyExist.build();
        Mockito.doThrow(new AlreadyExistException()).when(systemConfigServiceBean).initConfiguration(initializationConfigDto, TOKEN_DUMMY);

        try{
            systemConfigFacade.initConfiguration(initializationConfigDto, TOKEN_DUMMY);

        }catch (HttpResponseException e){
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_validateEmailService_should_throw_CommunicationFail_when_throw_EmailNotificationException() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        ResponseInfo errorResponseInfo = ResponseBuild.Email.CommunicationFail.build();
        Mockito.doThrow(new EmailNotificationException()).when(systemConfigServiceBean).verifyEmailService(initializationConfigDto);

        try{
            systemConfigFacade.validateEmailService(initializationConfigDto);

        }catch (HttpResponseException e){
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_validateEmailService_should_throw_CommunicationFail_when_throw_EncryptedException() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        ResponseInfo errorResponseInfo = ResponseBuild.Email.CommunicationFail.build();
        Mockito.doThrow(new EncryptedException()).when(systemConfigServiceBean).verifyEmailService(initializationConfigDto);

        try{
            systemConfigFacade.validateEmailService(initializationConfigDto);

        }catch (HttpResponseException e){
            validateException(e, errorResponseInfo);
            throw e;
        }
    }

    private void validateException(HttpResponseException exception, ResponseInfo responseInfo){
        Assert.assertEquals(exception.getResponseInfo().MESSAGE, responseInfo.MESSAGE);
        Assert.assertEquals(exception.getResponseInfo().STATUS, responseInfo.STATUS);
    }
}
