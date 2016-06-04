package br.org.otus.domain.client;

import br.org.otus.domain.client.exceptions.RestCallException;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;

public class Resource {
    public static String REST_SUFFIX = "-rest";
    public static String REST_VERSION = "/v01";

    protected String DOMAIN_URL;

    public Resource(String domainRestUrl) {
        this.DOMAIN_URL = domainRestUrl + REST_SUFFIX + REST_VERSION;
    }

    protected void validationResponse(HttpResponse response) throws RestCallException {
        if(!(( Integer )HttpStatus.SC_OK).equals((response.getStatusLine().getStatusCode()))){
            throw new RestCallException();
        }
    }
}
