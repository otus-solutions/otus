package br.org.otus.rest;

import javax.inject.Inject;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.*;

import com.google.gson.Gson;

import br.org.otus.configuration.SystemConfigService;
import br.org.otus.rest.dtos.OtusConfigDto;

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
    public String config(String systemConfigJSon) {
        Response response = new Response();
        OtusConfigDto otusConfigDto = new Gson().fromJson(systemConfigJSon, OtusConfigDto.class);

        try {
            systemConfigService.createInitialSystemConfig(otusConfigDto);
            
            // TODO chamar register do projeto otus - url,nome,token
            response.setData(Boolean.TRUE);
            return response.toJson();
        } catch (Exception e) {
            response.setData(Boolean.FALSE);
            return response.toJson();
        }
    }

}
