package br.org.otus.response.info;

import br.org.otus.response.exception.ResponseInfo;

import javax.ws.rs.core.Response;

public class Validation extends ResponseInfo{

    public Validation() {
        super(Response.Status.BAD_REQUEST, "Data Validation Fail");
    }

    public static ResponseInfo build(){
        return new Validation();
    }
}
