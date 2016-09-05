package br.org.otus.survey.converters;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import br.org.otus.survey.Survey;
import br.org.otus.survey.converters.SurveyBuilder;
import br.org.otus.survey.dtos.SurveyDto;
import br.org.otus.survey.dtos.item.SurveyItemDto;
import br.org.otus.survey.dtos.utils.adapters.SurveyItemAdapter;

@Ignore
public class SurveyBuilderTest {

	private static final String SURVEY_TEMPLATE = "surveyTemplate (15).json";
	
	private SurveyBuilder surveyBuilder;
	private String surveyJson;
	private SurveyDto surveyDto;
	private Survey survey;
	private Gson gson;

	@Before
	public void setUp() {
		// get JSON
		try {
			URI uri = ClassLoader.getSystemResource(SURVEY_TEMPLATE).toURI();
			surveyJson = new String(Files.readAllBytes(Paths.get(uri)), Charset.forName("utf-8"));
		} catch (IOException | URISyntaxException e) {
			e.printStackTrace();
		}
		
		// Convert JSON to SurveyDto
		GsonBuilder builder = new GsonBuilder();
		builder.registerTypeAdapter(SurveyItemDto.class, new SurveyItemAdapter());
		builder.disableHtmlEscaping();
		builder.setPrettyPrinting();
		gson = builder.create();
		surveyDto = gson.fromJson(surveyJson, SurveyDto.class);
		
		// Instance of builder
		surveyBuilder = new SurveyBuilder();
	}

	@Test
	public void surveyItem() {
		survey = surveyBuilder.buildFromDto(surveyDto).build();
//		System.out.println(survey.toString());
		System.out.println(gson.toJson(survey));
	}

}
