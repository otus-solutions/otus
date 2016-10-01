package br.org.otus.survey.validators;

public interface ValidatorResponse {
    Boolean isValid();

    String getType();

    boolean equals(Object o);

    int hashCode();
}
