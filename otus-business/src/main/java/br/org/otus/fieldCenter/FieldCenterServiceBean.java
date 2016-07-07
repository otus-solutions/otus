package br.org.otus.fieldCenter;

import br.org.otus.exceptions.AlreadyExistException;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.FieldCenterNotFoundException;
import br.org.otus.exceptions.InvalidDtoException;
import br.org.otus.fieldCenter.dtos.FieldCenterDto;
import br.org.otus.fieldCenter.dtos.FieldCenterUpdateDto;
import br.org.tutty.Equalizer;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@Stateless
public class FieldCenterServiceBean implements FieldCenterService {
    @Inject
    private FieldCenterDao fieldCenterDao;

    @Override
    public void create(FieldCenterDto fieldCenterDto) throws InvalidDtoException, AlreadyExistException {
        try {
            if (fieldCenterDto.isValid()) {
                if (!fieldCenterDao.acronymInUse(fieldCenterDto.acronym)) {
                    FieldCenter fieldCenter = new FieldCenter();

                    Equalizer.equalize(fieldCenterDto, fieldCenter);
                    fieldCenterDao.merge(fieldCenter);
                } else {
                    throw new AlreadyExistException();
                }
            } else {
                throw new InvalidDtoException();
            }
        } catch (IllegalAccessException | NoSuchFieldException e) {
            throw new InvalidDtoException();
        }
    }

    @Override
    public void update(FieldCenterUpdateDto fieldCenterUpdateDto) throws InvalidDtoException, FieldCenterNotFoundException {
        try {
            if (fieldCenterUpdateDto.isValid()) {
                FieldCenter fieldCenter = fieldCenterDao.fetchByAcronym(fieldCenterUpdateDto.getAcronym());
                Equalizer.equalize(fieldCenterUpdateDto, fieldCenter);
                fieldCenterDao.update(fieldCenter);

            } else {
                throw new InvalidDtoException();
            }

        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new InvalidDtoException();

        } catch (DataNotFoundException e) {
            throw new FieldCenterNotFoundException();
        }
    }

    @Override
    public List<FieldCenterDto> fetchAll() {
        List<FieldCenterDto> fieldCenterDtos = new ArrayList<>();
        List<FieldCenter> fieldCenters = (List<FieldCenter>) (Object) fieldCenterDao.getListResult("", FieldCenter.class);

        fieldCenters.stream().forEach(fieldCenter -> {
            FieldCenterDto fieldCenterDto = new FieldCenterDto();
            try {
                Equalizer.equalize(fieldCenter, fieldCenterDto);
                fieldCenterDtos.add(fieldCenterDto);
            } catch (IllegalAccessException | NoSuchFieldException e) {
            }
        });

        return fieldCenterDtos;
    }

    @Override
    public FieldCenterDto fetchByAcronym(String acronym) throws FieldCenterNotFoundException, InvalidDtoException {
        try {
            FieldCenter fieldCenter = fieldCenterDao.fetchByAcronym(acronym);
            FieldCenterDto fieldCenterDto = new FieldCenterDto();
            Equalizer.equalize(fieldCenter, fieldCenterDto);

            return fieldCenterDto;

        } catch (IllegalAccessException | NoSuchFieldException e) {
            throw new InvalidDtoException();
        } catch (DataNotFoundException e) {
            throw new FieldCenterNotFoundException();
        }
    }
}
