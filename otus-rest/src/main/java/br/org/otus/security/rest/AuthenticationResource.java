package br.org.otus.security.rest;

import br.org.otus.exceptions.*;
import br.org.otus.rest.Response;
import br.org.otus.security.dtos.AuthenticationDto;
import br.org.otus.security.dtos.ProjectAuthenticationDto;
import br.org.otus.security.services.SecurityService;

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
    private SecurityService securityService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String authenticate(AuthenticationDto authenticationDto, @Context HttpServletRequest request) {
        Response response = new Response();

        authenticationDto.encryptPassword();
        authenticationDto.setIssuer(request.getRequestURL().toString());

        try {
            String jwt = securityService.authenticate(authenticationDto);
            return response.buildSuccess(jwt).toJson();

        } catch (InvalidPasswordException | EmailNotFoundException | UserDisabledException | TokenException e) {
            return response.buildError(((ResponseError) e)).toJson();
        }
    }

    @POST
    @Path("/project")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String projectAuthenticate(ProjectAuthenticationDto projectAuthenticationDto) {
        Response response = new Response();

        try {
            String jwt = securityService.projectAuthenticate(projectAuthenticationDto);
            return response.buildSuccess(jwt).toJson();

        } catch (InvalidDtoException | TokenException | InvalidPasswordException e) {
            return response.buildError(((ResponseError) e)).toJson();
        }
    }

    @POST
    @Path("/invalidate")
    public void invalidate(@Context HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        securityService.invalidate(token);
    }
}
