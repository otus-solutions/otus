package br.org.otus.configuration.api;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.configuration.service.SystemConfigService;
import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.exceptions.webservice.common.AlreadyExistException;
import br.org.otus.exceptions.webservice.http.EmailNotificationException;
import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.response.builders.ResponseBuild;
import br.org.otus.response.exception.HttpResponseException;

import javax.inject.Inject;

public class SystemConfigFacade {

    @Inject
    private SystemConfigService systemConfigService;

    @Inject
    private EmailNotifierService emailNotifierService;

    public String initConfiguration(OtusInitializationConfigDto initializationConfigDto, String projectToken) {
        try {
            systemConfigService.initConfiguration(initializationConfigDto, projectToken);
            return projectToken;

        } catch (EmailNotificationException | EncryptedException e) {
            throw new HttpResponseException(ResponseBuild.Email.CommunicationFail.build());

        } catch (AlreadyExistException e) {
            throw new HttpResponseException(ResponseBuild.User.AlreadyExist.build());
        }
    }

    public void validateEmailService(OtusInitializationConfigDto otusInitializationConfigDto){
        try {
            systemConfigService.verifyEmailService(otusInitializationConfigDto);

        } catch (EmailNotificationException | EncryptedException e) {
            throw new HttpResponseException(ResponseBuild.Email.CommunicationFail.build());
        }
    }

    public Boolean isReady() {
        return systemConfigService.isReady();
    }

    public String buildToken() {
        return systemConfigService.buildToken();
    }
}
