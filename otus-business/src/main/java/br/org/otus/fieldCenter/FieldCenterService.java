package br.org.otus.fieldCenter;

import br.org.otus.exceptions.AlreadyExistException;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.InvalidDtoException;
import br.org.otus.fieldCenter.dtos.FieldCenterDto;
import br.org.otus.fieldCenter.dtos.FieldCenterUpdateDto;

import java.util.List;

public interface FieldCenterService {
    void create(FieldCenterDto fieldCenterDto) throws InvalidDtoException, AlreadyExistException;

    void update(FieldCenterUpdateDto fieldCenterUpdateDto) throws InvalidDtoException, DataNotFoundException;

    List<FieldCenterDto> fetchAll();

    FieldCenterDto fetchByAcronym(String acronym) throws DataNotFoundException, InvalidDtoException;
}
