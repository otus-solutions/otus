package br.org.otus.fieldCenter;

import br.org.otus.exceptions.webservice.common.AlreadyExistException;
import br.org.otus.exceptions.webservice.common.DataNotFoundException;
import br.org.otus.exceptions.webservice.validation.ValidationException;
import br.org.otus.fieldCenter.dtos.FieldCenterDto;
import br.org.otus.fieldCenter.dtos.FieldCenterUpdateDto;

import java.util.List;

public interface FieldCenterService {
    void create(FieldCenterDto fieldCenterDto) throws AlreadyExistException, ValidationException;

    void update(FieldCenterUpdateDto fieldCenterUpdateDto) throws ValidationException, DataNotFoundException;

    List<FieldCenterDto> list();

    FieldCenterDto fetchByAcronym(String acronym) throws DataNotFoundException;
}
