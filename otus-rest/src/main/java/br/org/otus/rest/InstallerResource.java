package br.org.otus.rest;

import javax.inject.Inject;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.*;

import com.google.gson.Gson;

import br.org.otus.configuration.SystemConfigService;
import br.org.otus.rest.dtos.SystemConfigDto;

@Path("/installer")
public class InstallerResource {

	@Inject
	private SystemConfigService systemConfigService;

	@GET
	@Path("/ready")
	@Produces(MediaType.APPLICATION_JSON)
	public String ready() {
		Response response = new Response();
		response.setData(systemConfigService.isReady());
		return response.toJson();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String config(String systemConfigJSon) {
		SystemConfigDto systemConfigDto = new Gson().fromJson(systemConfigJSon, SystemConfigDto.class);
		
		try {
			//systemConfigDto.getUserDto().encrypt(); ?
			systemConfigService.createInitialSystemConfig(systemConfigDto);
			return new Gson().toJson(Boolean.FALSE);
		}
		catch (Exception e) {
			return new Gson().toJson(Boolean.FALSE);
		}
	}
	
	
}
