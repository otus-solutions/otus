package br.org.otus.fieldCenter.api;

import br.org.otus.exceptions.webservice.common.AlreadyExistException;
import br.org.otus.exceptions.webservice.common.DataNotFoundException;
import br.org.otus.exceptions.webservice.validation.ValidationException;
import br.org.otus.fieldCenter.FieldCenterService;
import br.org.otus.fieldCenter.dtos.FieldCenterDto;
import br.org.otus.fieldCenter.dtos.FieldCenterUpdateDto;
import br.org.otus.response.builders.ResponseBuild;
import br.org.otus.response.exception.HttpResponseException;

import javax.inject.Inject;
import java.util.List;

public class FieldCenterFacade {

    @Inject
    private FieldCenterService fieldCenterService;

    public void create(FieldCenterDto fieldCenterDto) {
        try {
            fieldCenterService.create(fieldCenterDto);

        } catch (AlreadyExistException e) {
            throw new HttpResponseException(ResponseBuild.FieldCenter.NotFound.build());

        } catch (ValidationException e) {
            throw new HttpResponseException(ResponseBuild.Security.Validation.build());
        }
    }

    public List<FieldCenterDto> list() {
        return fieldCenterService.list();
    }

    public void update(FieldCenterUpdateDto fieldCenterUpdateDto){
        try {
            fieldCenterService.update(fieldCenterUpdateDto);

        } catch (ValidationException e) {
            throw new HttpResponseException(ResponseBuild.Security.Validation.build());

        } catch (DataNotFoundException e) {
            throw new HttpResponseException(ResponseBuild.FieldCenter.NotFound.build());
        }
    }
}
