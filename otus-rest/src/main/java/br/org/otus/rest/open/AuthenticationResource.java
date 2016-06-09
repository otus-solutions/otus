package br.org.otus.rest.open;

import br.org.otus.exceptions.EmailNotFoundException;
import br.org.otus.exceptions.InvalidPasswordException;
import br.org.otus.exceptions.TokenException;
import br.org.otus.exceptions.UserDisabledException;
import br.org.otus.rest.Response;
import br.org.otus.security.dtos.AuthenticationDto;
import br.org.otus.security.services.SecurityService;
import com.google.gson.Gson;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
    @Inject
    private HttpSession httpSession;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String authenticate(String data, @Context HttpServletRequest request) {
        Gson gson = new Gson();
        AuthenticationDto authenticationDto = gson.fromJson(data, AuthenticationDto.class);
        authenticationDto.encryptPassword();
        authenticationDto.setIssuer(request.getRequestURL().toString());

        Response response = new Response();
        try {
            String jwt = securityService.authenticate(authenticationDto);
            response.setData(jwt);
            response.setHasErrors(Boolean.FALSE);
            return response.toJson();

        } catch (InvalidPasswordException | EmailNotFoundException | UserDisabledException | TokenException e) {
            response.setHasErrors(Boolean.TRUE);
            return response.setError(e).toJson();
        }
    }

    @POST
    @Path("/invalidate")
    public void invalidate(@Context HttpServletRequest request){
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        securityService.invalidate(token);
    }
}
