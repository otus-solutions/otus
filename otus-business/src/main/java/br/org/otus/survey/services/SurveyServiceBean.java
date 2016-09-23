package br.org.otus.survey.services;

import br.org.otus.survey.SurveyDao;
import org.ccem.otus.survey.Survey;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;

@Stateless
public class SurveyServiceBean implements SurveyService {

	@Inject
	private SurveyDao surveyDao;

	@Override
	public void saveSurvey(Survey survey) {
		// TODO: Validate this survey
		surveyDao.persist(Survey.serialize(survey));
	}

	@Override
	public List<Survey> list() {
		return surveyDao.find();
	}

	@Override
	public List<Survey> findByAcronym(String acronym) {
		return surveyDao.findByAcronym(acronym);
	}

}
