package br.org.otus.domain.actions;

import br.org.otus.exceptions.webservice.http.RestCallException;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;

public class Resource {
    public static final String CONTENT_TYPE = "content-type";
    public static final String CONTENT_TYPE_VALUE = "application/json";
    public String DOMAIN_URL;

    public Resource(String domainRestUrl) {
        this.DOMAIN_URL = normalizeUrl(domainRestUrl);
    }

    protected String normalizeUrl(String domainUrl){
        UrlProvider domainUrlProvider = new UrlProvider();
        domainUrlProvider.setUrl(domainUrl);
        domainUrlProvider.setContext(UrlProvider.DEFAULT_CONTEXT);
        domainUrlProvider.setVersion(UrlProvider.DEFAULT_VERSION);

        return domainUrlProvider.getFullAddress();
    }


    protected void validationResponse(HttpResponse response) throws RestCallException {
        Integer statusOk = HttpStatus.SC_OK;
        Integer responseStatus = response.getStatusLine().getStatusCode();

        if(!statusOk.equals(responseStatus)){
            throw new RestCallException();
        }
    }
}
