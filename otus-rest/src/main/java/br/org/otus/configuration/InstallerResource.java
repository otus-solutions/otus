package br.org.otus.configuration;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import br.org.otus.configuration.api.SystemConfigFacade;
import br.org.otus.configuration.dto.DomainDto;
import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.domain.actions.DomainRegisterResource;
import br.org.otus.domain.actions.RequestUrlMapping;
import br.org.otus.domain.exceptions.DomainConnectionError;
import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.response.builders.ResponseBuild;
import br.org.otus.response.exception.HttpResponseException;
import br.org.otus.rest.Response;

@Path("/installer")
public class InstallerResource {

    @Inject
    private SystemConfigFacade systemConfigFacade;

    @GET
    @Path("/ready")
    @Produces(MediaType.APPLICATION_JSON)
    public String ready() {
        Response response = new Response();
        return response.buildSuccess(systemConfigFacade.isReady()).toJson();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String config(OtusInitializationConfigDto systemConfigDto, @Context HttpServletRequest request) {
        try {
            systemConfigDto.encrypt();

            String token = systemConfigFacade.buildToken();
            registerProjectOnDomain(systemConfigDto, request, token);
            systemConfigFacade.initConfiguration(systemConfigDto, token);
            return new Response().buildSuccess().toJson();

        } catch (EncryptedException e) {
            throw new HttpResponseException(ResponseBuild.Security.Validation.build());
        }
    }

    @POST
    @Path("/validation/email")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String validationEmail(OtusInitializationConfigDto otusInitializationConfigDto) {
        try {
            Response response = new Response();
            otusInitializationConfigDto.encrypt();
            systemConfigFacade.validateEmailService(otusInitializationConfigDto);
            return response.buildSuccess().toJson();

        } catch (EncryptedException e) {
            throw new HttpResponseException(ResponseBuild.Security.Validation.build());
        }
    }

    public void registerProjectOnDomain(OtusInitializationConfigDto initData, HttpServletRequest request, String projectToken) {
        try {
            DomainRegisterResource domainRegisterResource = new DomainRegisterResource(initData.getDomainDto().getDomainRestUrl());
            DomainDto domainDto = new DomainDto();
            domainDto.setDomainRestUrl(domainRegisterResource.DOMAIN_URL);
            domainRegisterResource.registerProject(RequestUrlMapping.getUrl(request), initData.getProject().getProjectName(), projectToken);

        } catch (DomainConnectionError domainConnectionError) {
            throw new HttpResponseException(ResponseBuild.Http.Communication.build());
        }
    }

}
