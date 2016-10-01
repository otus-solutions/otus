package br.org.otus.survey.services;

import br.org.otus.survey.validators.AcronymValidator;
import br.org.otus.survey.validators.SurveyValidation;
import br.org.otus.survey.SurveyDao;

import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.otus.survey.validators.CustomIdValidator;
import org.ccem.otus.survey.form.SurveyForm;

import java.util.List;

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
}
