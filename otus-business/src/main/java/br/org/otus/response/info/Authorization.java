package br.org.otus.response.info;

import br.org.otus.response.exception.ResponseInfo;

import javax.ws.rs.core.Response;

public class Authorization extends ResponseInfo {

    public Authorization() {
        super(Response.Status.UNAUTHORIZED, "Authentication Invalid");
    }

    public static ResponseInfo build(){
        return new Authorization();
    }
}

