package br.org.otus.survey.api;

import javax.inject.Inject;
import javax.validation.ValidationException;

import br.org.otus.response.exception.HttpResponseException;
import br.org.otus.survey.dtos.SurveyDto;
import br.org.otus.survey.services.SurveyService;

public class SurveyFacade {

	@Inject
	private SurveyService surveyService;

	public void saveSurvey(SurveyDto surveyDto) {
		try {
			surveyService.saveSurvey(surveyDto);
		} catch (ValidationException e) {
			// TODO: Create a builder
			throw new HttpResponseException(null);
		}
	}

}
