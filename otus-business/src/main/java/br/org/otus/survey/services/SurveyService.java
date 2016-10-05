package br.org.otus.survey.services;

import java.util.List;

import org.ccem.otus.survey.form.SurveyForm;

import br.org.otus.exceptions.webservice.common.AlreadyExistException;
import br.org.otus.exceptions.webservice.validation.ValidationException;
import br.org.otus.survey.dtos.UpdateSurveyFormTypeDto;

public interface SurveyService {

	SurveyForm saveSurvey(SurveyForm survey) throws AlreadyExistException;
	
	List<SurveyForm> list();
	
	List<SurveyForm> findByAcronym(String acronym);
	
	boolean updateSurveyFormType(UpdateSurveyFormTypeDto updateSurveyFormTypeDto) throws ValidationException;
	
	boolean deleteByAcronym(String acronym) throws ValidationException;

}
