package br.org.otus.fieldCenter;

import br.org.otus.exceptions.AlreadyExistException;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.InvalidDtoException;
import br.org.otus.exceptions.ResponseError;
import br.org.otus.fieldCenter.dtos.FieldCenterDto;
import br.org.otus.fieldCenter.dtos.FieldCenterUpdateDto;
import br.org.otus.rest.Response;
import br.org.otus.security.Secured;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/center")
public class FieldCenterResource {
    @Inject
    private FieldCenterService fieldCenterService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Secured
    public String create(FieldCenterDto fieldCenterDto) {
        Response response = new Response();

        try {
            fieldCenterService.create(fieldCenterDto);
            response.setHasErrors(Boolean.FALSE);

        } catch (InvalidDtoException | AlreadyExistException e) {
            response.setError(((ResponseError) e).getObjectError()).setHasErrors(Boolean.TRUE);
        }

        return response.toJson();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Secured
    public String list() {
        return new Response().setData(fieldCenterService.fetchAll()).toJson();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Secured
    public String update(FieldCenterUpdateDto fieldCenterUpdateDto) {
        Response response = new Response();

        try {
            fieldCenterService.update(fieldCenterUpdateDto);
            response.setHasErrors(Boolean.FALSE);
        } catch (InvalidDtoException | DataNotFoundException e) {
            response.setHasErrors(Boolean.TRUE).setError(((ResponseError) e).getObjectError());

        }

        return response.toJson();
    }
}
