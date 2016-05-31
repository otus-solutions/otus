package br.org.otus.dao;

/**
 * Created by drferreira on 30/05/16.
 */
public class SystemConfigDao extends GenericDao {

    public Boolean isReady() {
        long count = (long) getSingleResult(String.format("db.%s.count()", "SystemConfig"));
        if (count == 0){
            return Boolean.FALSE;
        }else {
            return Boolean.TRUE;
        }
    }
}
