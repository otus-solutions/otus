package br.org.otus.survey.api;

import br.org.otus.survey.services.SurveyService;
import org.ccem.otus.survey.Survey;

import javax.inject.Inject;
import java.util.List;

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