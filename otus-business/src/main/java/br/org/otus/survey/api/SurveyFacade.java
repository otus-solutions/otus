package br.org.otus.survey.api;

import java.util.List;

import javax.inject.Inject;

import br.org.otus.survey.validators.SurveyValidation;
import org.ccem.otus.survey.form.SurveyForm;
import org.ccem.otus.survey.template.SurveyTemplate;

import br.org.otus.survey.services.SurveyService;

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


    // TODO Comentado Nao sei porque kkkkkk
//	public void updateSurveyFormType(String acronym) {
//		return surveyService.findByAcronym(acronym);
//	}

}