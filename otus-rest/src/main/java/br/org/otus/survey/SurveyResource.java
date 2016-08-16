package br.org.otus.survey;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.org.otus.rest.Response;

@Path("/surveys")
public class SurveyResource {

		
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public String create(Object survey) {
		Response response = new Response();
		
		//SurveyService.saveSurveyReview(survey)
		
		
		return response.toJson();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getSurveysList() {
		Response response = new Response();
		
		//SurveyService.fetchAll()
		
		return response.toJson();
	}
}
