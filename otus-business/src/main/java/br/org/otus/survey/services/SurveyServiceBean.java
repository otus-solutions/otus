package br.org.otus.survey.services;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.validation.ValidationException;

import br.org.otus.survey.Survey;
import br.org.otus.survey.SurveyDao;
import br.org.otus.survey.converters.SurveyBuilder;
import br.org.otus.survey.dtos.SurveyDto;

@Stateless
public class SurveyServiceBean implements SurveyService {
	
	@Inject
	private SurveyDao surveyDao;

	@Override
	public void saveSurvey(SurveyDto surveyDto) {
		SurveyBuilder surveyBuilder = new SurveyBuilder();
		
		if(surveyDto.isValid()) {
			Survey survey = surveyBuilder.buildFromDto(surveyDto).build();
			surveyDao.persist(survey);
		} else {
			throw new ValidationException();
		}
	}

}
