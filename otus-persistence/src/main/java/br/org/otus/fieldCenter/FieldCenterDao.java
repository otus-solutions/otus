package br.org.otus.fieldCenter;

import br.org.otus.dao.GenericDao;
import br.org.otus.exceptions.DataNotFoundException;

import javax.persistence.NoResultException;

public class FieldCenterDao extends GenericDao {

    public Boolean acronymInUse(String acronym) {
        try {
            fetchByAcronym(acronym);

            return Boolean.TRUE;

        } catch (DataNotFoundException | NoResultException e) {
            return Boolean.FALSE;
        }
    }

    public FieldCenter fetchByAcronym(String acronym) throws DataNotFoundException {
        String query = String.format("db.%s.find({ 'acronym' : '%s' })", "FieldCenter", acronym);
        return (FieldCenter) notWaitingEmpty(getSingleResult(query, FieldCenter.class));
    }
}
