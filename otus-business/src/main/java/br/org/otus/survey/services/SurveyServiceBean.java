package br.org.otus.survey.services;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.ccem.otus.survey.form.SurveyForm;

import br.org.otus.exceptions.webservice.validation.ValidationException;
import br.org.otus.survey.SurveyDao;
import br.org.otus.survey.dtos.UpdateSurveyFormTypeDto;
import br.org.otus.survey.validators.AcronymValidator;
import br.org.otus.survey.validators.CustomIdValidator;
import br.org.otus.survey.validators.SurveyValidation;

@Stateless
public class SurveyServiceBean implements SurveyService {

	@Inject
	private SurveyDao surveyDao;

	@Override
	public SurveyValidation saveSurvey(SurveyForm survey) {
		SurveyValidation surveyValidation = validateSurvey(survey);

		if (surveyValidation.isValid())
			surveyDao.persist(SurveyForm.serialize(survey));

		return surveyValidation;
	}

	public SurveyValidation validateSurvey(SurveyForm surveyForm) {
		SurveyValidation surveyValidation = new SurveyValidation();
		CustomIdValidator customIdValidator = new CustomIdValidator(surveyDao, surveyForm);
		AcronymValidator acronymValidator = new AcronymValidator(surveyDao, surveyForm);

		surveyValidation.addValidatorResponse(customIdValidator.validate());
		surveyValidation.addValidatorResponse(acronymValidator.validate());
		return surveyValidation;
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
	public String updateSurveyFormType(UpdateSurveyFormTypeDto updateSurveyFormTypeDto) throws ValidationException {
		if (updateSurveyFormTypeDto.isValid()) {
			return surveyDao.updateSurveyFormType(updateSurveyFormTypeDto.acronym,
					updateSurveyFormTypeDto.newSurveyFormType.toString());
		} else {
			throw new ValidationException();
		}

	}
}
