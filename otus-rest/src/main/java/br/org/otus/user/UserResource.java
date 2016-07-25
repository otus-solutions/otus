package br.org.otus.user;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.org.otus.configuration.SystemConfigService;
import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.exceptions.ResponseError;
import br.org.otus.rest.Response;

@Path("/user")
public class UserResource {

	@Inject
	private SystemConfigService systemConfigService;

	@POST
	@Path("/signup")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String config(SignupDataDto SignupDataDto) {
		Response response = new Response();

		try {
			response.buildSuccess();

		} catch (Exception e) {
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
