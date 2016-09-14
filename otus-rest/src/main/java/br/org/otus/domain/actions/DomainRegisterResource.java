package br.org.otus.domain.actions;


import br.org.otus.domain.exceptions.DomainConnectionError;
import br.org.otus.exceptions.webservice.http.RestCallException;
import com.google.gson.Gson;
import org.apache.http.HttpEntity;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONException;

import java.io.IOException;

public class DomainRegisterResource extends Resource {
    public static final String REGISTER_REST_PATH = "/otus";

    public DomainRegisterResource(String domainRestUrl) {
        super(domainRestUrl);
    }

    public void registerProject(String projectRestUrl, String projectName, String token)
            throws DomainConnectionError {

        try {
            HttpClient httpClient = HttpClientBuilder.create().build();

            HttpPost httpPost = new HttpPost(DOMAIN_URL + REGISTER_REST_PATH);
            httpPost.addHeader(CONTENT_TYPE, CONTENT_TYPE_VALUE);

            HttpEntity json = new StringEntity(new OtusProjectDto(projectRestUrl, projectName, token).toJson(),
                    ContentType.create(CONTENT_TYPE_VALUE));
            httpPost.setEntity(json);

            validationResponse(httpClient.execute(httpPost));
        } catch (RestCallException | IOException | JSONException e) {
            throw new DomainConnectionError(e);
        }
    }

    class OtusProjectDto {
        public String projectRestUrl;
        public String projectName;
        public String projectToken;

        public OtusProjectDto(String projectRestUrl, String projectName, String projectToken) {
            this.projectRestUrl = projectRestUrl;
            this.projectName = projectName;
            this.projectToken = projectToken;
        }

        public String toJson() throws JSONException {
            Gson gson = new Gson();
            return gson.toJson(this);
        }

    }
}
