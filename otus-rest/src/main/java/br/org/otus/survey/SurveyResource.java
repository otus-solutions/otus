package br.org.otus.survey;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.ccem.otus.survey.Survey;

import br.org.otus.rest.Response;
import br.org.otus.survey.api.SurveyFacade;

@Path("/surveys")
public class SurveyResource {

	@Inject
	private SurveyFacade surveyFacade;

	@POST
	public String post(String survey) {
		surveyFacade.saveSurvey(Survey.deserialize(survey));
		return new Response().buildSuccess().toJson();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String a() {
		return new Response().buildSuccess(surveyFacade.list()).toJson();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String b(@QueryParam("acronym") String acronym) {
		return new Response().buildSuccess(surveyFacade.findByAcronym(acronym)).toJson();
	}

}
