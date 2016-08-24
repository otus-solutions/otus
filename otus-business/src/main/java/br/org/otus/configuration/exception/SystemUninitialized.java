package br.org.otus.configuration.exception;

import javax.ws.rs.WebApplicationException;

public class SystemUninitialized  extends WebApplicationException{
    public SystemUninitialized() {
    }

    public SystemUninitialized(Throwable cause) {
        super(cause);
    }
}
