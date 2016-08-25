package br.org.otus.survey.builders;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.Survey;
import br.org.otus.survey.builders.SurveyBuilder;
import br.org.otus.survey.dtos.SurveyDto;

public class SurveyBuilderTest {

	private static final String SURVEY_TEMPLATE = "surveyTemplate.json";
	
	private SurveyBuilder surveyBuilder;
	private String surveyJson;
	private SurveyDto surveyDto;
	private Survey survey;

	@Before
	public void setUp() {
/*
		// get JSON
		try {
			URI uri = ClassLoader.getSystemResource(SURVEY_TEMPLATE).toURI();
			surveyJson = new String(Files.readAllBytes(Paths.get(uri)), Charset.forName("utf-8"));
		} catch (IOException | URISyntaxException e) {
			e.printStackTrace();
		}
		
		// Convert JSON to SurveyDto
		surveyDto = new Gson().fromJson(surveyJson, SurveyDto.class);
		
		// Instance of builder
		surveyBuilder = new SurveyBuilder();
		survey = new Survey();*/
	}

	@Test
	public void surveyItem() {
		/*survey = surveyBuilder.buildFromDto(surveyDto).build();
		System.out.println(survey.toString());
*/
	}

}
