package br.org.otus.survey;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import br.org.otus.rest.Response;
import br.org.otus.survey.dtos.SurveyDto;
import br.org.otus.survey.dtos.item.SurveyItemDto;
import br.org.otus.survey.dtos.utils.adapters.SurveyItemAdapter;
import br.org.otus.survey.services.SurveyService;

@Path("/surveys")
public class SurveyResource {

	@Inject
	private SurveyService surveyService;

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public String create(String survey) {
		Response response = new Response();

		GsonBuilder builder = new GsonBuilder();
		builder.registerTypeAdapter(SurveyItemDto.class, new SurveyItemAdapter());
		Gson gson = builder.create();

		SurveyDto surveyDto = gson.fromJson(survey, SurveyDto.class);

		surveyService.saveSurvey(surveyDto);

		return response.toJson();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getSurveysList() {
		Response response = new Response();

		//surveyService.fetchAll();

		return response.toJson();
	}

	public static void main(String[] args) {
		SurveyResource surveyResource = new SurveyResource();
		String a = "{}";
		surveyResource.create(a);
	}
}
