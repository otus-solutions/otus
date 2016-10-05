package br.org.otus.survey.api;

import java.util.List;

import javax.inject.Inject;

import org.ccem.otus.survey.form.SurveyForm;
import org.ccem.otus.survey.template.SurveyTemplate;

import br.org.otus.exceptions.webservice.common.AlreadyExistException;
import br.org.otus.exceptions.webservice.validation.ValidationException;
import br.org.otus.response.builders.ResponseBuild;
import br.org.otus.response.exception.HttpResponseException;
import br.org.otus.survey.dtos.UpdateSurveyFormTypeDto;
import br.org.otus.survey.services.SurveyService;

public class SurveyFacade {

	@Inject
	private SurveyService surveyService;

	public List<SurveyForm> list() {
		return surveyService.list();
	}

	public List<SurveyForm> findByAcronym(String acronym) {
		return surveyService.findByAcronym(acronym);
	}

	public SurveyForm publishSurveyTemplate(SurveyTemplate surveyTemplate, String userEmail) {
		SurveyForm s = new SurveyForm(surveyTemplate, userEmail);
		try {
			return surveyService.saveSurvey(s);
		} catch (AlreadyExistException e) {
			if(e.getCause().getMessage().contains("Acronym")) {
				throw new HttpResponseException(ResponseBuild.Survey.AcronymAlreadyExist.build());
			} else {
				throw new HttpResponseException(ResponseBuild.Survey.NonUniqueItemID.build());
			}
		}
	}

	public boolean updateSurveyFormType(UpdateSurveyFormTypeDto updateSurveyFormTypeDto) {
		try {
			return surveyService.updateSurveyFormType(updateSurveyFormTypeDto);
		} catch (ValidationException e) {
			throw new HttpResponseException(ResponseBuild.Security.Validation.build());
		}
	}
	
	public boolean deleteByAcronym(String acronym) {
		try {
			return surveyService.deleteByAcronym(acronym);
		} catch (ValidationException e) {
			throw new HttpResponseException(ResponseBuild.Security.Validation.build());
		}
	}

}