package br.org.otus.survey.validators;

import br.org.otus.survey.SurveyDao;
import org.ccem.otus.survey.form.SurveyForm;
import org.ccem.otus.survey.template.identity.Identity;
import org.ccem.otus.survey.template.item.questions.selectable.CheckboxQuestion;
import org.ccem.otus.survey.template.item.questions.selectable.options.CheckboxOption;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CustomIdValidator implements SurveyValidator {
    private SurveyDao surveyDao;
    private SurveyForm surveyForm;

    public CustomIdValidator(SurveyDao surveyDao, SurveyForm surveyForm) {
        this.surveyDao = surveyDao;
        this.surveyForm = surveyForm;
    }

    @Override
    public ValidatorResponse validate() {
        Response validatorResponse = new Response();

        Set<String> customIds = surveyForm.getSurveyTemplate().getCustomIds();
        List<Identity> conflicts = surveyDao.findByCustomId(customIds).stream()
                .map(foundedSurvey -> foundedSurvey.getSurveyTemplate().identity)
                .collect(Collectors.toList());

        validatorResponse.setConflicts(conflicts);
        return validatorResponse;
    }

    class Response implements ValidatorResponse {
        private String VALIDATION_TYPE = "UNIQUE_ID";
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
