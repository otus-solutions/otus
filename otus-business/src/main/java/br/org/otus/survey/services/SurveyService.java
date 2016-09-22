package br.org.otus.survey.services;

import java.util.List;

import org.ccem.otus.survey.Survey;

public interface SurveyService {

	void saveSurvey(Survey survey);
	
	List<Survey> list();
	
	List<Survey> findByAcronym(String acronym);

}
