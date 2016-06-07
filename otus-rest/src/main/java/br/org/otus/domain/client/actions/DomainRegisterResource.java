package br.org.otus.domain.client.actions;

import br.org.otus.domain.client.exceptions.RestCallException;
import com.google.gson.Gson;
import org.apache.http.HttpEntity;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONException;

import java.io.IOException;
import java.util.UUID;

public class DomainRegisterResource extends Resource {
    public static String REGISTER_REST_PATH = "/otus/register";

    public DomainRegisterResource(String domainRestUrl) {
        super(domainRestUrl);
    }

    public void registerProject(String projectRestUrl, String projectName, UUID token) throws IOException, JSONException, RestCallException {
        HttpClient httpClient = HttpClientBuilder.create().build();

        HttpPost httpPost = new HttpPost(DOMAIN_URL + REGISTER_REST_PATH);
        httpPost.addHeader(CONTENT_TYPE, CONTENT_TYPE_VALUE);

        HttpEntity json = new StringEntity(new OtusProjectDto(projectRestUrl, projectName, token).toJson());
        httpPost.setEntity(json);

        validationResponse(httpClient.execute(httpPost));
    }

    class OtusProjectDto{
        private String projectRestUrl;
        private String projectName;
        private UUID token;

        public OtusProjectDto(String projectRestUrl, String projectName, UUID token) {
            this.projectRestUrl = projectRestUrl;
            this.projectName = projectName;
            this.token = token;
        }

        public String toJson() throws JSONException {
            Gson gson  = new Gson();
            return gson.toJson(this);
        }

    }
}
