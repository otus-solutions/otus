package br.org.otus.installer;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.*;

import br.org.otus.rest.RequestUrlMapping;
import br.org.otus.rest.Response;
import br.org.otus.domain.client.actions.DomainRegisterResource;
import br.org.otus.domain.client.UrlProvider;
import com.google.gson.Gson;

import br.org.otus.configuration.SystemConfigService;
import br.org.otus.rest.dtos.OtusInitializationConfigDto;

import java.util.UUID;

@Path("/installer")
public class InstallerResource {

    @Inject
    private SystemConfigService systemConfigService;

    @GET
    @Path("/ready")
    @Produces(MediaType.APPLICATION_JSON)
    public String ready() {
        Response response = new Response();
        response.setData(systemConfigService.isReady());
        return response.toJson();
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
            UUID projectToken = systemConfigService.generateProjectToken();

            domainRegisterResource.registerProject(RequestUrlMapping.getUrl(request), projectName, projectToken);
            systemConfigService.createInitialSystemConfig(otusInitializationConfigDto, projectToken);

            return response.setData(Boolean.TRUE).toJson();

        } catch (Exception e) {
            return response.setHasErrors(true).setData(e).toJson();
        }
    }

}
