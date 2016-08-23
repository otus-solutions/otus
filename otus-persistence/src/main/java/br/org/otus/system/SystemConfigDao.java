package br.org.otus.system;

import br.org.otus.dao.GenericDao;
import br.org.otus.email.BasicEmailSender;
import br.org.otus.exceptions.DataNotFoundException;

public class SystemConfigDao extends GenericDao {

	public Boolean isReady() {
		return exist(SystemConfig.class);
	}

	public SystemConfig fetchSystemConfig() throws DataNotFoundException {
		return (SystemConfig) notWaitingEmpty(getSingleResult("", SystemConfig.class));
	}

	public BasicEmailSender findEmailSender() throws DataNotFoundException {
		SystemConfig systemConfig = (SystemConfig) notWaitingEmpty(getSingleResult("", SystemConfig.class));
		return systemConfig.getEmailSender();
	}
}
