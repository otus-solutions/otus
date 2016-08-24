package br.org.otus.exceptions.webservice.security;

public class TokenException extends Exception {
    public TokenException(Throwable cause) {
        super(cause);
    }

    public TokenException() {
    }
}
