package br.org.otus.exceptions.webservice.validation;

public class ValidationException extends Exception {
    public ValidationException(Throwable cause) {
        super(cause);
    }

    public ValidationException() {
    }
}
