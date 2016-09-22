package br.org.otus.survey.api;

import java.util.List;

import javax.inject.Inject;

import org.ccem.otus.survey.Survey;

import br.org.otus.survey.services.SurveyService;

public class SurveyFacade {

	@Inject
	private SurveyService surveyService;

	public void saveSurvey(Survey survey) {
		surveyService.saveSurvey(survey);
	}

	public List<Survey> list() {
		return surveyService.list();
	}

	public List<Survey> findByAcronym(String acronym) {
		return surveyService.findByAcronym(acronym);
	}

}