package br.org.otus.configuration.rest;

import br.org.otus.configuration.SystemConfigService;
import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.domain.client.actions.DomainRegisterResource;
import br.org.otus.exceptions.ResponseError;
import br.org.otus.rest.RequestUrlMapping;
import br.org.otus.rest.Response;
import com.google.gson.Gson;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

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
    public String config(String systemConfigJSon, @Context HttpServletRequest request) {
        Response response = new Response();
        OtusInitializationConfigDto otusInitializationConfigDto = new Gson().fromJson(systemConfigJSon, OtusInitializationConfigDto.class);

        DomainRegisterResource domainRegisterResource = new DomainRegisterResource(otusInitializationConfigDto.getDomainRestUrl());
        otusInitializationConfigDto.setDomainRestUrl(domainRegisterResource.DOMAIN_URL);

        String projectName = otusInitializationConfigDto.getProjectName();

        try {
            String projectToken = systemConfigService.generateProjectToken();

            domainRegisterResource.registerProject(RequestUrlMapping.getUrl(request), projectName, projectToken);
            systemConfigService.createInitialSystemConfig(otusInitializationConfigDto, projectToken);

            response.buildSuccess();

        } catch (Exception e) {
            response.buildError(((ResponseError)e));
        }

        return response.toJson();
    }

}
