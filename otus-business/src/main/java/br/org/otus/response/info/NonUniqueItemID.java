package br.org.otus.response.info;

import javax.ws.rs.core.Response;

import br.org.otus.response.exception.ResponseInfo;

public class NonUniqueItemID  extends ResponseInfo {

    public NonUniqueItemID() {
        super(Response.Status.CONFLICT, "ID Already Exists");
    }

    public static ResponseInfo build(){
        return new NonUniqueItemID();
    }

}
