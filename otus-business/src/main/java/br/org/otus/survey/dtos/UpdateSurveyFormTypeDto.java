package br.org.otus.survey.dtos;

import org.ccem.otus.survey.form.SurveyFormType;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.rest.dtos.Dto;

public class UpdateSurveyFormTypeDto implements Dto {
	
	public String acronym;
	public SurveyFormType newSurveyFormType;

	@Override
	public Boolean isValid() {
		return (acronym != null && !acronym.isEmpty() && 
				newSurveyFormType != null);
	}

	@Override
	public void encrypt() throws EncryptedException {}

}
