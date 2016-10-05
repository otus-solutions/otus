package br.org.otus.response.info;

import br.org.otus.response.exception.ResponseInfo;

import javax.ws.rs.core.Response;

public class AcronymAlreadyExist extends ResponseInfo{

    public AcronymAlreadyExist() {
        super(Response.Status.CONFLICT, "Acronym Already Exists");
    }

    public static ResponseInfo build(){
        return new AcronymAlreadyExist();
    }
}

