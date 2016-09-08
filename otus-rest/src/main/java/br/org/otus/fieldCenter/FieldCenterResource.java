package br.org.otus.fieldCenter;

import br.org.otus.fieldCenter.api.FieldCenterFacade;
import br.org.otus.fieldCenter.dtos.FieldCenterDto;
import br.org.otus.fieldCenter.dtos.FieldCenterUpdateDto;
import br.org.otus.rest.Response;
import br.org.otus.security.Secured;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/center")
public class FieldCenterResource {
    @Inject
    private FieldCenterFacade fieldCenterFacade;

    @POST
    @Secured
    @Consumes(MediaType.APPLICATION_JSON)
    public String create(FieldCenterDto fieldCenterDto) {
        Response response = new Response();
        fieldCenterFacade.create(fieldCenterDto);
        return response.buildSuccess().toJson();
    }

    @GET
    @Secured
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    public String list() {
        Response response = new Response();
        List<FieldCenterDto> fieldCenterDtos = fieldCenterFacade.list();
        return response.setData(fieldCenterDtos).toJson();
    }

    @POST
    @Secured
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public String update(FieldCenterUpdateDto fieldCenterUpdate) {
        Response response = new Response();
        fieldCenterFacade.update(fieldCenterUpdate);
        return response.buildSuccess().toJson();
    }
}
