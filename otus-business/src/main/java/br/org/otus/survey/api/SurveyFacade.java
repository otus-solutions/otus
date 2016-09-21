package br.org.otus.survey.api;

import javax.inject.Inject;

import org.ccem.otus.survey.Survey;

import br.org.otus.survey.services.SurveyService;

public class SurveyFacade {

	@Inject
	private SurveyService surveyService;

	public void saveSurvey(Survey survey) {
		surveyService.saveSurvey(survey);
	}

}