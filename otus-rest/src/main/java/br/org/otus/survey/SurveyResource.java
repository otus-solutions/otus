package br.org.otus.survey;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.org.otus.rest.Response;
import br.org.otus.survey.api.SurveyFacade;
import br.org.otus.survey.dtos.SurveyDto;
import br.org.otus.survey.dtos.api.SurveyDtoFacade;

@Path("/surveys")
public class SurveyResource {

	@Inject
	private SurveyFacade surveyFacade;

	@POST
	public String create(String survey) {
		Response response = new Response();
		
		SurveyDto surveyDto = SurveyDtoFacade.deserialize(survey);
		
		surveyFacade.saveSurvey(surveyDto);

		return response.toJson();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getSurveysList() {
		Response response = new Response();

		// surveyFacade.list();

		return response.toJson();
	}

}
