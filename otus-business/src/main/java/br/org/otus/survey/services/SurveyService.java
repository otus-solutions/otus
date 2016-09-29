package br.org.otus.survey.services;

import java.util.List;

import org.ccem.otus.survey.form.SurveyForm;

public interface SurveyService {

	void saveSurvey(SurveyForm survey);
	
	List<SurveyForm> list();
	
	List<SurveyForm> findByAcronym(String acronym);

}
