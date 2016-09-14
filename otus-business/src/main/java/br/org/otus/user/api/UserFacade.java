package br.org.otus.user.api;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.exceptions.webservice.common.AlreadyExistException;
import br.org.otus.exceptions.webservice.common.DataNotFoundException;
import br.org.otus.exceptions.webservice.http.EmailNotificationException;
import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.exceptions.webservice.validation.ValidationException;
import br.org.otus.response.builders.ResponseBuild;
import br.org.otus.response.exception.HttpResponseException;
import br.org.otus.user.dto.ManagementUserDto;
import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.management.ManagementUserService;
import br.org.otus.user.signup.SignupService;

import javax.inject.Inject;
import java.util.List;

public class UserFacade {

    @Inject
    private EmailNotifierService emailNotifierService;

    @Inject
    private ManagementUserService managementUserService;

    @Inject
    private SignupService signupService;

    public void create(OtusInitializationConfigDto initializationConfigDto) {
        try {
            signupService.create(initializationConfigDto);

        } catch (EmailNotificationException | EncryptedException e) {
            throw new HttpResponseException(ResponseBuild.Email.CommunicationFail.build());

        } catch (AlreadyExistException e) {
            throw new HttpResponseException(ResponseBuild.User.AlreadyExist.build());

        } catch (ValidationException e) {
            throw new HttpResponseException(ResponseBuild.Security.Validation.build());
        }
    }

    public void create(SignupDataDto signupDataDto) {
        try {
            signupService.create(signupDataDto);

        } catch (EncryptedException | EmailNotificationException e) {
            throw new HttpResponseException(ResponseBuild.Email.CommunicationFail.build());

        } catch (AlreadyExistException e) {
            throw new HttpResponseException(ResponseBuild.User.AlreadyExist.build());

        } catch (DataNotFoundException e) {
            throw new HttpResponseException(ResponseBuild.System.NotInitialized.build());

        } catch (ValidationException e) {
            throw new HttpResponseException(ResponseBuild.Security.Validation.build());
        }
    }

    public List<ManagementUserDto> list() {
        return managementUserService.list();
    }

    public void disable(ManagementUserDto managementUserDto) {
        try {
            managementUserService.disable(managementUserDto);

        } catch (EmailNotificationException | EncryptedException e) {
            throw new HttpResponseException(ResponseBuild.Email.CommunicationFail.build());

        } catch (ValidationException e) {
            throw new HttpResponseException(ResponseBuild.Security.Validation.build());

        } catch (DataNotFoundException e) {
            throw new HttpResponseException(ResponseBuild.System.NotInitialized.build());
        }
    }

    public void enable(ManagementUserDto managementUserDto) {
        try {
            managementUserService.enable(managementUserDto);

        } catch (EmailNotificationException | EncryptedException e) {
            throw new HttpResponseException(ResponseBuild.Email.CommunicationFail.build());

        } catch (ValidationException e) {
            throw new HttpResponseException(ResponseBuild.Security.Validation.build());

        } catch (DataNotFoundException e) {
            throw new HttpResponseException(ResponseBuild.System.NotInitialized.build());
        }
    }
}
