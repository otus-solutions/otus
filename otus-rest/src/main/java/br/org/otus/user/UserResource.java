package br.org.otus.user;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.email.validation.EmailConstraint;
import br.org.otus.exceptions.ResponseError;
import br.org.otus.rest.Response;
import br.org.otus.security.Secured;
import br.org.otus.user.dto.ManagementUserDto;
import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.service.ManagementUserService;
import br.org.otus.user.signup.SignupService;
import br.org.otus.user.signup.exception.SignupException;

@Path("/user")
public class UserResource {

    @Inject
    private SignupService signupService;
    @Inject
    private EmailConstraint emailConstraint;
    @Inject
    private ManagementUserService managementUserService;
    
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
    
    @GET
    @Path("/exists")
    @Produces(MediaType.APPLICATION_JSON)
    public String userEmailExists(@QueryParam("email") String email) {
        Boolean result = emailConstraint.isUnique(email);
        Response response = new Response();
        return response.buildSuccess(!result).toJson();
    }
    
    @GET
    @Path("/fetch")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Secured
    public String getUsers() {
        List<ManagementUserDto> managementUserDtos = managementUserService.fetchUsers();
        Response response = new Response();
        return response.buildSuccess(managementUserDtos).toJson();
    }
    
    @POST
    @Path("/disable")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Secured
    public String disableUsers(ManagementUserDto managementUserDto) {
        managementUserService.disableUsers(managementUserDto);
        Response response = new Response();

        return response.buildSuccess().toJson();

    }

    @POST
    @Path("/enable")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Secured
    public String enableUsers(ManagementUserDto managementUserDto) {
        managementUserService.enableUsers(managementUserDto);
        Response response = new Response();

        return response.buildSuccess().toJson();
    }


}
