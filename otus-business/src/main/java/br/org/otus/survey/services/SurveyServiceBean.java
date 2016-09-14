package br.org.otus.survey.services;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.google.gson.JsonObject;

import br.org.otus.survey.SurveyDao;

@Stateless
public class SurveyServiceBean implements SurveyService {
	
	@Inject
	private SurveyDao surveyDao;

	@Override 
	public void saveSurvey(JsonObject json) {
		surveyDao.persist(json);
	}

}
