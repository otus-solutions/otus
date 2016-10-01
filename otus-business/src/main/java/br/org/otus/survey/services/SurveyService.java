package br.org.otus.survey.services;

import java.util.List;

import br.org.otus.survey.validators.SurveyValidation;
import org.ccem.otus.survey.form.SurveyForm;

public interface SurveyService {

	SurveyValidation saveSurvey(SurveyForm survey);
	
	List<SurveyForm> list();
	
	List<SurveyForm> findByAcronym(String acronym);

}
