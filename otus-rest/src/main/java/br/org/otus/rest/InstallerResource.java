package br.org.otus.rest;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.*;

import br.org.otus.domain.client.DomainRegisterResource;
import com.google.gson.Gson;

import br.org.otus.configuration.SystemConfigService;
import br.org.otus.rest.dtos.OtusInitializationConfigDto;
import org.apache.http.HttpResponse;

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

        try {
            UUID token = systemConfigService.createInitialSystemConfig(otusInitializationConfigDto);

            StringBuffer projectRestUrl = new StringBuffer();
            projectRestUrl.append(request.getServerName());
            projectRestUrl.append(":");
            projectRestUrl.append(request.getServerPort());
            projectRestUrl.append(request.getContextPath());

            String projectName = otusInitializationConfigDto.getProjectName();
            String domainUrl = otusInitializationConfigDto.getDomainRestUrl();

            DomainRegisterResource domainRegisterResource = new DomainRegisterResource(domainUrl);
            domainRegisterResource.registerProject(projectRestUrl.toString(), projectName, token);

            return response.setData(Boolean.TRUE).toJson();

        } catch (Exception e) {
            e.printStackTrace();
            return response.setHasErrors(true).setData(e).toJson();
        }
    }


}
