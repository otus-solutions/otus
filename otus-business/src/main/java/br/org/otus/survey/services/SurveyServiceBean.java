package br.org.otus.survey.services;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.ccem.otus.survey.Survey;

import br.org.otus.survey.SurveyDao;

@Stateless
public class SurveyServiceBean implements SurveyService {

	@Inject
	private SurveyDao surveyDao;

	@Override
	public void saveSurvey(Survey survey) {
		//TODO: Validate this survey
		surveyDao.persist(Survey.serialize(survey));
	}

}
