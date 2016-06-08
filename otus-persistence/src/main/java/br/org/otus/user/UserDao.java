package br.org.otus.user;

import br.org.otus.dao.GenericDao;
import br.org.otus.exceptions.DataNotFoundException;

import javax.persistence.NoResultException;

public class UserDao extends GenericDao {

    public User fetchByEmail(String email) throws DataNotFoundException {
        try {
            return ((User) notWaitingEmpty(getSingleResult(String.format("db.%s.find({'email':'%s'})", "User", email), User.class)));
        }catch (NoResultException e){
            throw new DataNotFoundException();
        }
    }
}
