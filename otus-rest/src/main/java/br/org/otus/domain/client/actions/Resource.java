package br.org.otus.domain.client.actions;

import br.org.otus.domain.client.UrlProvider;
import br.org.otus.domain.client.exceptions.RestCallException;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;

public class Resource {
    public static String CONTENT_TYPE = "content-type";
    public static String CONTENT_TYPE_VALUE = "application/json";
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
        if(!(( Integer )HttpStatus.SC_OK).equals((response.getStatusLine().getStatusCode()))){
            throw new RestCallException();
        }
    }
}
