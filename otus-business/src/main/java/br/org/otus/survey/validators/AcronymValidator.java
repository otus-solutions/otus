package br.org.otus.survey.validators;

import br.org.otus.survey.SurveyDao;
import org.ccem.otus.survey.form.SurveyForm;
import org.ccem.otus.survey.template.identity.Identity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class AcronymValidator implements SurveyValidator {
    private SurveyDao surveyDao;
    private SurveyForm surveyForm;

    public AcronymValidator(SurveyDao surveyDao, SurveyForm surveyForm) {
        this.surveyDao = surveyDao;
        this.surveyForm = surveyForm;
    }

    @Override
    public ValidatorResponse validate() {
        Response validatorResponse = new Response();
        String acronym = surveyForm.getSurveyTemplate().identity.acronym;
        List<SurveyForm> founded = surveyDao.findByAcronym(acronym);

        List<Identity> conflicts = founded.stream()
                .map(survey -> survey.getSurveyTemplate().identity)
                .collect(Collectors.toList());

        validatorResponse.setConflicts(conflicts);
        return validatorResponse;
    }

    class Response implements ValidatorResponse {
        private String VALIDATION_TYPE = "UNIQUE_ACRONYM";
        private List<Identity> conflicts = new ArrayList<>();

        @Override
        public Boolean isValid() {
            return conflicts.isEmpty();
        }

        @Override
        public String getType() {
            return VALIDATION_TYPE;
        }

        public void setConflicts(List<Identity> conflicts) {
            this.conflicts = conflicts;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            Response response = (Response) o;

            return VALIDATION_TYPE != null ? VALIDATION_TYPE.equals(response.VALIDATION_TYPE) : response.VALIDATION_TYPE == null;
        }

        @Override
        public int hashCode() {
            return VALIDATION_TYPE != null ? VALIDATION_TYPE.hashCode() : 0;
        }
    }
}
