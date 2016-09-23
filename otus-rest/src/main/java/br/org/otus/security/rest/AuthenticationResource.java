package br.org.otus.security.rest;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.response.builders.ResponseBuild;
import br.org.otus.response.exception.HttpResponseException;
import br.org.otus.rest.Response;
import br.org.otus.security.api.SecurityFacade;
import br.org.otus.security.dtos.AuthenticationDto;
import br.org.otus.security.dtos.ProjectAuthenticationDto;
import br.org.otus.security.dtos.UserSecurityAuthorizationDto;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;

@Path("/authentication")
public class AuthenticationResource {

    @Inject
    private SecurityFacade securityFacade;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String authenticate(AuthenticationDto authenticationDto, @Context HttpServletRequest request){
        try{
            authenticationDto.encrypt();
            Response response = new Response();
            String requestAddress = request.getRemoteAddr().toString();
            UserSecurityAuthorizationDto userSecurityAuthorizationDto = securityFacade.userAuthentication(authenticationDto, requestAddress);
            return response.buildSuccess(userSecurityAuthorizationDto).toJson();

        } catch (EncryptedException e) {
            throw new HttpResponseException(ResponseBuild.Security.Validation.build());
        }
    }

    @POST
    @Path("/project")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String projectAuthenticate(ProjectAuthenticationDto projectAuthenticationDto, @Context HttpServletRequest request) {
        try{
            projectAuthenticationDto.encrypt();
            Response response = new Response();
            String requestAddress = request.getRemoteAddr().toString();
            String jwt = securityFacade.projectAuthentication(projectAuthenticationDto, requestAddress);
            return response.buildSuccess(jwt).toJson();

        } catch (EncryptedException e) {
            throw new HttpResponseException(ResponseBuild.Security.Validation.build());
        }
    }

    @POST
    @Path("/invalidate")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public void invalidate(@Context HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        securityFacade.invalidate(token);
    }
}
