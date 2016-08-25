package br.org.otus.survey;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.org.otus.rest.Response;
import br.org.otus.survey.dtos.SurveyDto;
import br.org.otus.survey.services.SurveyService;

@Path("/surveys")
public class SurveyResource {
	
	@Inject
	private SurveyService surveyService;
		
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public String create(SurveyDto surveyDto) {
		Response response = new Response();
		
		surveyService.saveSurvey(surveyDto);
		
		return response.toJson();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getSurveysList() {
		Response response = new Response();
		
		//surveyService.fetchAll()
		
		return response.toJson();
	}
}
