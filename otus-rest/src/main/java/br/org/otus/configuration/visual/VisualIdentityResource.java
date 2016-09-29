package br.org.otus.configuration.visual;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.org.otus.rest.Response;

@Path("configuration/visual-identity")
public class VisualIdentityResource {

	// TODO: Visual Identity End-Point

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String post(String json) {
		return new Response().buildSuccess(true).toJson();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String get() {
		return new Response().buildSuccess(null).toJson();
	}

}
