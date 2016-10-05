package br.org.otus.survey.services;

import org.ccem.otus.survey.form.SurveyForm;

import br.org.otus.exceptions.webservice.common.AlreadyExistException;
import br.org.otus.survey.SurveyDao;
import br.org.otus.survey.validators.AcronymValidator;
import br.org.otus.survey.validators.CustomIdValidator;

public class SurveyValidorService {

	public void validateSurvey(SurveyDao surveyDao, SurveyForm surveyForm) throws AlreadyExistException {
		AcronymValidator acronymValidator = new AcronymValidator(surveyDao, surveyForm);
		if (!acronymValidator.validate().isValid()) {
			throw new AlreadyExistException(new Throwable("Acronym Already exists"));
		}
		CustomIdValidator customIdValidator = new CustomIdValidator(surveyDao, surveyForm);
		if (!customIdValidator.validate().isValid()) {
			throw new AlreadyExistException(new Throwable("Item ID already exists"));
		}
	}

}
