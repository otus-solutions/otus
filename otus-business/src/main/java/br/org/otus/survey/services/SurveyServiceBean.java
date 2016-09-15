package br.org.otus.survey.services;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.validation.ValidationException;

import br.org.otus.survey.SurveyDao;
import br.org.otus.survey.dtos.SurveyDto;
import br.org.otus.survey.dtos.api.SurveyDtoFacade;

@Stateless
public class SurveyServiceBean implements SurveyService {

	@Inject
	private SurveyDao surveyDao;

	@Override
	public void saveSurvey(SurveyDto surveyDto) {
		if (surveyDto.isValid()) {
			surveyDao.persist(SurveyDtoFacade.serialize(surveyDto));
		} else {
			throw new ValidationException("Invalid Survey Dto");
		}
	}

}
