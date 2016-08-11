package br.org.otus.user;

import java.util.List;

import javax.persistence.NoResultException;

import br.org.otus.dao.GenericDao;
import br.org.otus.exceptions.DataNotFoundException;

public class UserDao extends GenericDao {

    private static final String EMAIL = "email";
    private static final String ADM = "adm";

    public User fetchByEmail(String email) throws DataNotFoundException {
        try {
            return ((User) notWaitingEmpty(getSingleResult(String.format("db.%s.find({'email':'%s'})", "User", email), User.class)));
        } catch (NoResultException e) {
            throw new DataNotFoundException();
        }
    }

    public Boolean emailExists(String email) {
        String query = String.format("db.%s.find({ '%s' : '%s' })", "User", EMAIL, email);
        try {
            notWaitingEmpty(getSingleResult(query, User.class));
            return Boolean.TRUE;

        } catch (NoResultException | DataNotFoundException e) {
            return Boolean.FALSE;
        }
    }

    public User findAdmin() throws DataNotFoundException {
        String query = String.format("db.%s.find({ '%s' : %s })", "User", ADM, true);
        return (User) notWaitingEmpty(getSingleResult(query, User.class));
    }
    
    public List<User> fetchAll() {
        String query = String.format("db.%s.find({})", "User");
        return getListResult(query, User.class);
    }

}
