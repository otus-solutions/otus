package br.org.otus.configuration.rest;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.json.JSONException;

import com.google.gson.Gson;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.configuration.service.SystemConfigService;
import br.org.otus.domain.DomainDto;
import br.org.otus.domain.client.actions.DomainRegisterResource;
import br.org.otus.domain.client.exceptions.RestCallException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.exceptions.ResponseError;
import br.org.otus.rest.RequestUrlMapping;
import br.org.otus.rest.Response;

@Path("/installer")
public class InstallerResource {

    @Inject
    private SystemConfigService systemConfigService;

    @GET
    @Path("/ready")
    @Produces(MediaType.APPLICATION_JSON)
    public String ready() {
        Response response = new Response();
        return response.buildSuccess(systemConfigService.isReady()).toJson();
    }

    @POST
    @Path("/config")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String config(String systemConfigData, @Context HttpServletRequest request) {
        Response response = new Response();
        OtusInitializationConfigDto initData = new Gson().fromJson(systemConfigData, OtusInitializationConfigDto.class);

        try {
            String projectToken = systemConfigService.generateProjectToken();
            registerProjectOnDomain(initData, request, projectToken);
            systemConfigService.createInitialSystemConfig(initData, projectToken);
            response.buildSuccess();
        } catch (Exception e) {
            response.buildError(((ResponseError) e));
        }

        return response.toJson();
    }

    @POST
    @Path("/validation")
    @Consumes(MediaType.APPLICATION_JSON)
    public String validation(String systemConfigJSon) {
    	OtusInitializationConfigDto initializationConfigDto = new Gson().fromJson(systemConfigJSon, OtusInitializationConfigDto.class);
        Response response = new Response();

        try {
            systemConfigService.verifyEmailService(initializationConfigDto);
            response.setData(Boolean.TRUE);
        } catch (EmailNotificationException e) {
            response.setData(Boolean.FALSE);
        }

        return response.toJson();
    }

    public void registerProjectOnDomain(OtusInitializationConfigDto initData, HttpServletRequest request, String projectToken) throws IOException, JSONException, RestCallException {
        DomainRegisterResource domainRegisterResource = new DomainRegisterResource(initData.getDomainDto().getDomainRestUrl());
        DomainDto domainDto = new DomainDto();
        domainDto.setDomainRestUrl(domainRegisterResource.DOMAIN_URL);
        domainRegisterResource.registerProject(RequestUrlMapping.getUrl(request), initData.getProject().getProjectName(), projectToken);
    }

}
