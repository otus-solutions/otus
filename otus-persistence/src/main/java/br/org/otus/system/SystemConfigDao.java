package br.org.otus.system;

import br.org.otus.dao.GenericDao;

public class SystemConfigDao extends GenericDao {

    public Boolean isReady() {
        return exist(SystemConfig.class);
    }
}
