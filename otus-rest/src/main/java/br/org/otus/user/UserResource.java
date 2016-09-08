package br.org.otus.user;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.response.builders.ResponseBuild;
import br.org.otus.response.exception.HttpResponseException;
import br.org.otus.rest.Response;
import br.org.otus.security.Secured;
import br.org.otus.user.api.UserFacade;
import br.org.otus.user.dto.ManagementUserDto;
import br.org.otus.user.dto.SignupDataDto;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/user")
public class UserResource {

    @Inject
    private UserFacade userFacade;

    @POST
    @Path("/signup")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String signup(SignupDataDto signupDataDto) {
        try {
            signupDataDto.encrypt();
            Response response = new Response();
            userFacade.create(signupDataDto);
            return response.buildSuccess().toJson();

        } catch (EncryptedException e) {
            throw new HttpResponseException(ResponseBuild.Security.Validation.build());
        }
    }

    @GET
    @Secured
    @Path("/list")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String list() {
        Response response = new Response();
        List<ManagementUserDto> managementUserDtos = userFacade.list();
        return response.buildSuccess(managementUserDtos).toJson();
    }

    @POST
    @Secured
    @Path("/disable")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String disableUsers(ManagementUserDto managementUserDto) {
        Response response = new Response();
        userFacade.disable(managementUserDto);
        return response.buildSuccess().toJson();
    }

    @POST
    @Secured
    @Path("/enable")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String enableUsers(ManagementUserDto managementUserDto) {
        Response response = new Response();
        userFacade.enable(managementUserDto);
        return response.buildSuccess().toJson();
    }
}
