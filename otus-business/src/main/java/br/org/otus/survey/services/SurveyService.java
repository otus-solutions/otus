package br.org.otus.survey.services;

import java.util.List;

import org.ccem.otus.survey.form.SurveyForm;

import br.org.otus.exceptions.webservice.validation.ValidationException;
import br.org.otus.survey.dtos.UpdateSurveyFormTypeDto;
import br.org.otus.survey.validators.SurveyValidation;

public interface SurveyService {

	SurveyValidation saveSurvey(SurveyForm survey);
	
	List<SurveyForm> list();
	
	List<SurveyForm> findByAcronym(String acronym);
	
	String updateSurveyFormType(UpdateSurveyFormTypeDto updateSurveyFormTypeDto) throws ValidationException;

}
