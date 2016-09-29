package br.org.otus.survey.services;

import br.org.otus.survey.SurveyDao;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.ccem.otus.survey.form.SurveyForm;

import java.util.List;

@Stateless
public class SurveyServiceBean implements SurveyService {

	@Inject
	private SurveyDao surveyDao;

	@Override
	public void saveSurvey(SurveyForm survey) {
		// TODO: Validate this survey
		surveyDao.persist(SurveyForm.serialize(survey));
	}

	@Override
	public List<SurveyForm> list() {
		return surveyDao.find();
	}

	@Override
	public List<SurveyForm> findByAcronym(String acronym) {
		return surveyDao.findByAcronym(acronym);
	}

}
