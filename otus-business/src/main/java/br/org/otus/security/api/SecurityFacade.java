package br.org.otus.security.api;

import br.org.otus.exceptions.webservice.security.AuthenticationException;
import br.org.otus.exceptions.webservice.security.TokenException;
import br.org.otus.response.builders.ResponseBuild;
import br.org.otus.response.exception.HttpResponseException;
import br.org.otus.security.dtos.AuthenticationDto;
import br.org.otus.security.dtos.ProjectAuthenticationDto;
import br.org.otus.security.dtos.UserSecurityAuthorizationDto;
import br.org.otus.security.services.SecurityService;

import javax.inject.Inject;

public class SecurityFacade {

    @Inject
    private SecurityService securityService;

    public UserSecurityAuthorizationDto userAuthentication(AuthenticationDto authenticationDto, String requestAddress) {
        try {
            authenticationDto.setRequestAddress(requestAddress);
            return securityService.authenticate(authenticationDto);

        } catch (AuthenticationException | TokenException e) {
            throw new HttpResponseException(ResponseBuild.Security.Authorization.build());
        }
    }

    public String projectAuthentication(ProjectAuthenticationDto projectAuthenticationDto, String requestAddress) {
        try {
            projectAuthenticationDto.setRequestAddress(requestAddress);
            return securityService.projectAuthenticate(projectAuthenticationDto);

        } catch (AuthenticationException | TokenException e) {
            throw new HttpResponseException(ResponseBuild.Security.Authorization.build());
        }
    }

    public void invalidate(String token) {
        securityService.invalidate(token);
    }

}
