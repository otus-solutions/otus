package br.org.otus.response.info;

import br.org.otus.response.exception.ResponseInfo;

import javax.ws.rs.core.Response;

public class AlreadyExist extends ResponseInfo{

    public AlreadyExist() {
        super(Response.Status.CONFLICT, "Data Already Exist");
    }

    public static ResponseInfo build(){
        return new AlreadyExist();
    }
}

