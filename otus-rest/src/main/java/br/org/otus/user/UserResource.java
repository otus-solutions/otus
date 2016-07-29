package br.org.otus.user;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.exceptions.ResponseError;
import br.org.otus.rest.Response;
import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.signup.SignupService;
import br.org.otus.user.signup.exception.SignupException;

@Path("/user")
public class UserResource {

    @Inject
    private SignupService signupService;

    @POST
    @Path("/signup")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String signup(SignupDataDto signupDataDto) {
        Response response = new Response();

        try {
            signupService.execute(signupDataDto);
            response.buildSuccess();
        } catch (SignupException e) {
            response.buildError(((ResponseError) e));
        }

        return response.toJson();
    }

    @POST
    @Path("/validation")
    @Consumes(MediaType.APPLICATION_JSON)
    public String validation(OtusInitializationConfigDto otusInitializationConfigDto) {
        System.out.println(otusInitializationConfigDto);
        return new Response().buildSuccess().toJson();
    }

}
