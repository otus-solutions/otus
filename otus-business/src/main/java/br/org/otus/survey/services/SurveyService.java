package br.org.otus.survey.services;

import org.ccem.otus.survey.Survey;

import java.util.List;

public interface SurveyService {

	void saveSurvey(Survey survey);
	
	List<Survey> list();
	
	List<Survey> findByAcronym(String acronym);

}
