package br.org.otus.exceptions.webservice.security;

public class AuthenticationException extends Exception {
    public AuthenticationException() {
    }

    public AuthenticationException(Throwable cause) {
        super(cause);
    }
}
