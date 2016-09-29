package br.org.otus.survey.api;

import java.util.List;

import javax.inject.Inject;

import org.ccem.otus.survey.form.SurveyForm;
import org.ccem.otus.survey.template.SurveyTemplate;

import br.org.otus.survey.services.SurveyService;

public class SurveyFacade {

	@Inject
	private SurveyService surveyService;

	public void saveSurvey(SurveyForm survey) {
		surveyService.saveSurvey(survey);
	}

	public List<SurveyForm> list() {
		return surveyService.list();
	}

	public List<SurveyForm> findByAcronym(String acronym) {
		return surveyService.findByAcronym(acronym);
	}
	
	public void publishSurveyTemplate(SurveyTemplate surveyTemplate, String userEmail) {
		SurveyForm s = new SurveyForm(surveyTemplate, userEmail);
		surveyService.saveSurvey(s);
	}
	

//	public void updateSurveyFormType(String acronym) {
//		return surveyService.findByAcronym(acronym);
//	}

}