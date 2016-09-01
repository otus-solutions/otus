package br.org.otus.survey.services;

import javax.inject.Inject;

import br.org.otus.survey.Survey;
import br.org.otus.survey.SurveyDao;
import br.org.otus.survey.builders.SurveyBuilder;
import br.org.otus.survey.dtos.SurveyDto;

public class SurveyServiceBean implements SurveyService {
	
	@Inject
	private SurveyDao surveyDao;

	@Override
	public void saveSurvey(SurveyDto surveyDto) {
		SurveyBuilder surveyBuilder = new SurveyBuilder();
		
		if(surveyDto.isValid()) {
			Survey survey = surveyBuilder.buildFromDto(surveyDto).build();
			surveyDao.persist(survey);
		}
	}

}
