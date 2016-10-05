package br.org.otus.survey.services;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.ccem.otus.survey.form.SurveyForm;

import br.org.otus.exceptions.webservice.common.AlreadyExistException;
import br.org.otus.exceptions.webservice.validation.ValidationException;
import br.org.otus.survey.SurveyDao;
import br.org.otus.survey.dtos.UpdateSurveyFormTypeDto;

@Stateless
public class SurveyServiceBean implements SurveyService {

	@Inject
	private SurveyDao surveyDao;
	@Inject
	private SurveyValidorService surveyValidorService;

	@Override
	public SurveyForm saveSurvey(SurveyForm survey) throws AlreadyExistException {
		surveyValidorService.validateSurvey(surveyDao, survey);
		surveyDao.persist(SurveyForm.serialize(survey));
		return survey;
	}

	@Override
	public List<SurveyForm> list() {
		return surveyDao.find();
	}

	@Override
	public List<SurveyForm> findByAcronym(String acronym) {
		return surveyDao.findByAcronym(acronym);
	}

	@Override
	public boolean updateSurveyFormType(UpdateSurveyFormTypeDto updateSurveyFormTypeDto) throws ValidationException {
		if (updateSurveyFormTypeDto.isValid()) {
			return surveyDao.updateSurveyFormType(updateSurveyFormTypeDto.acronym,
					updateSurveyFormTypeDto.newSurveyFormType.toString());
		} else {
			throw new ValidationException();
		}
	}

	@Override
	public boolean deleteByAcronym(String acronym) throws ValidationException {
		if (acronym.isEmpty() || acronym == null) {
			throw new ValidationException();
		} else {
			return surveyDao.deleteByAcronym(acronym);
		}
	}

}
