package br.org.otus.user;

import br.org.otus.dao.GenericDao;

import javax.persistence.NoResultException;
import java.util.List;

public class UserDao extends GenericDao {

    private static final String EMAIL = "email";
    private static final String ADM = "adm";

    public User fetchByEmail(String email) {
        return ((User) notWaitingEmpty(getSingleResult(String.format("db.%s.find({'email':'%s'})", "User", email), User.class)));
    }

    public Boolean emailExists(String email) {
        String query = String.format("db.%s.find({ '%s' : '%s' })", "User", EMAIL, email);
        try {
            notWaitingEmpty(getSingleResult(query, User.class));
            return Boolean.TRUE;

        } catch (NoResultException e) {
            return Boolean.FALSE;
        }
    }

    public User findAdmin() {
        String query = String.format("db.%s.find({ '%s' : %s })", "User", ADM, true);
        return (User) notWaitingEmpty(getSingleResult(query, User.class));
    }

    public List<User> fetchAll() {
        String query = String.format("db.%s.find({})", "User");
        return getListResult(query, User.class);
    }

}
