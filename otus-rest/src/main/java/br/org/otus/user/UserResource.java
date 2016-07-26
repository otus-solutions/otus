package br.org.otus.user;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.org.otus.exceptions.InvalidDtoException;
import br.org.otus.exceptions.ResponseError;
import br.org.otus.rest.Response;
import br.org.otus.user.dtos.SignupDataDto;

@Path("/user")
public class UserResource {

	@Inject
	private SignupDataService signupDataService;

	@POST
	@Path("/signup")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String signup(SignupDataDto signupDataDto) {
		Response response = new Response();

		try {
			signupDataService.executeRegistration(signupDataDto);
			response.buildSuccess();
			throw new InvalidDtoException();
		} catch (Exception e) {
			response.buildError(((ResponseError) e));
		}

		return response.toJson();
	}

}
