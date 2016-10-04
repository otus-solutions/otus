package br.org.otus.survey.api;

import java.util.List;

import javax.inject.Inject;

import org.ccem.otus.survey.form.SurveyForm;
import org.ccem.otus.survey.template.SurveyTemplate;

import br.org.otus.exceptions.webservice.validation.ValidationException;
import br.org.otus.response.builders.ResponseBuild;
import br.org.otus.response.exception.HttpResponseException;
import br.org.otus.survey.dtos.UpdateSurveyFormTypeDto;
import br.org.otus.survey.services.SurveyService;
import br.org.otus.survey.validators.SurveyValidation;

public class SurveyFacade {

	@Inject
	private SurveyService surveyService;

	public SurveyValidation saveSurvey(SurveyForm survey) {
		return surveyService.saveSurvey(survey);
	}

	public List<SurveyForm> list() {
		return surveyService.list();
	}

	public List<SurveyForm> findByAcronym(String acronym) {
		return surveyService.findByAcronym(acronym);
	}

	public SurveyValidation publishSurveyTemplate(SurveyTemplate surveyTemplate, String userEmail) {
		SurveyForm s = new SurveyForm(surveyTemplate, userEmail);
		return surveyService.saveSurvey(s);
	}

	public String updateSurveyFormType(UpdateSurveyFormTypeDto updateSurveyFormTypeDto) {
		try {
			return surveyService.updateSurveyFormType(updateSurveyFormTypeDto);
		} catch (ValidationException e) {
			throw new HttpResponseException(ResponseBuild.Security.Validation.build());
		}
	}
	
	public String deleteByAcronym(String acronym) {
		try {
			return surveyService.deleteByAcronym(acronym);
		} catch (ValidationException e) {
			throw new HttpResponseException(ResponseBuild.Security.Validation.build());
		}
	}

}