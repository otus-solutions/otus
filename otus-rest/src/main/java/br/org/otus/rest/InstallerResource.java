package br.org.otus.rest;

import javax.inject.Inject;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.*;

import com.google.gson.Gson;

import br.org.otus.configuration.SystemConfigService;
import br.org.otus.rest.dtos.OtusConfigDto;

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
		OtusConfigDto OtusConfigDto = new Gson().fromJson(systemConfigJSon, OtusConfigDto.class);
		
		System.out.println(OtusConfigDto.getName());
		System.out.println(OtusConfigDto.getUrl());
		return String.valueOf(true);
		/*try {
			systemConfigService.createInitialSystemConfig(systemConfigDto);
			return new Gson().toJson(Boolean.FALSE);
		}
		catch (Exception e) {
			return new Gson().toJson(Boolean.FALSE);
		}

	*/
	}
	
	
}
