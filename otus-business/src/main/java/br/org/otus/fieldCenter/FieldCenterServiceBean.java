package br.org.otus.fieldCenter;

import br.org.otus.exceptions.webservice.common.AlreadyExistException;
import br.org.otus.exceptions.webservice.common.DataNotFoundException;
import br.org.otus.exceptions.webservice.validation.ValidationException;
import br.org.otus.fieldCenter.dtos.FieldCenterDto;
import br.org.otus.fieldCenter.dtos.FieldCenterUpdateDto;
import br.org.tutty.Equalizer;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.NoResultException;
import java.util.ArrayList;
import java.util.List;

@Stateless
public class FieldCenterServiceBean implements FieldCenterService {
    @Inject
    private FieldCenterDao fieldCenterDao;

    @Override
    public void create(FieldCenterDto fieldCenterDto) throws AlreadyExistException, ValidationException {
        if (fieldCenterDto.isValid()) {

            if (!fieldCenterDao.acronymInUse(fieldCenterDto.acronym)) {
                FieldCenter fieldCenter = new FieldCenter();
                Equalizer.equalize(fieldCenterDto, fieldCenter);
                fieldCenterDao.merge(fieldCenter);

            } else {
                throw new AlreadyExistException();
            }
        } else {
            throw new ValidationException();
        }
    }

    @Override
    public void update(FieldCenterUpdateDto fieldCenterUpdateDto) throws ValidationException, DataNotFoundException {
        try {
            if (fieldCenterUpdateDto.isValid()) {
                FieldCenter fieldCenter = fieldCenterDao.fetchByAcronym(fieldCenterUpdateDto.getAcronym());
                Equalizer.equalize(fieldCenterUpdateDto, fieldCenter);
                fieldCenterDao.update(fieldCenter);

            } else {
                throw new ValidationException();
            }
        } catch (NoResultException e) {
            throw new DataNotFoundException(e);
        }
    }

    @Override
    public List<FieldCenterDto> list() {
        List<FieldCenterDto> fieldCenterDtos = new ArrayList<>();
        List<FieldCenter> fieldCenters = (List<FieldCenter>) fieldCenterDao.getListResult("", FieldCenter.class);

        fieldCenters.stream().forEach(fieldCenter -> {
            FieldCenterDto fieldCenterDto = new FieldCenterDto();
            Equalizer.equalize(fieldCenter, fieldCenterDto);
            fieldCenterDtos.add(fieldCenterDto);
        });

        return fieldCenterDtos;
    }

    @Override
    public FieldCenterDto fetchByAcronym(String acronym) throws DataNotFoundException {
        try {
            FieldCenter fieldCenter = fieldCenterDao.fetchByAcronym(acronym);
            FieldCenterDto fieldCenterDto = new FieldCenterDto();
            Equalizer.equalize(fieldCenter, fieldCenterDto);
            return fieldCenterDto;

        } catch (NoResultException e) {
            throw new DataNotFoundException(e);
        }
    }
}
