package br.org.otus.response.info;

import br.org.otus.response.exception.ResponseInfo;

import javax.ws.rs.core.Response;

public class CommunicationFail extends ResponseInfo {

    public CommunicationFail() {
        super(Response.Status.PRECONDITION_FAILED, "Http Comunication Fail");
    }

    public static ResponseInfo build(){
        return new CommunicationFail();
    }
}
