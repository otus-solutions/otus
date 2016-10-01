package br.org.otus.survey.validators;

import java.util.HashSet;
import java.util.Set;

public class SurveyValidation {
    private Set<ValidatorResponse> responses;

    public SurveyValidation() {
        responses = new HashSet<>();
    }

    public Boolean isValid() {
        return !(responses.stream()
                .anyMatch(response -> (!response.isValid())));
    }

    public void addValidatorResponse(ValidatorResponse validatorResponse) {
        responses.add(validatorResponse);
    }
}
