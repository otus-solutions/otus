package br.org.otus.system;

import br.org.otus.dao.GenericDao;

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
