package br.org.otus.survey.services;

import javax.inject.Inject;

import br.org.otus.survey.Survey;
import br.org.otus.survey.SurveyDao;
import br.org.otus.survey.dto.SurveyDto;
import br.org.tutty.Equalizer;

public class SurveyServiceBean implements SurveyService {
	
	@Inject
	private SurveyDao surveyDao;

	@Override
	public void saveSurvey(SurveyDto surveyDto) {
		Survey survey = new Survey();
		
		Equalizer.equalize(surveyDto, survey);
		
		surveyDao.persist(survey);
	}

}
