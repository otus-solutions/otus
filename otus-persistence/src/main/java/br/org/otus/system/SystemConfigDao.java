package br.org.otus.system;

import br.org.otus.dao.GenericDao;
import br.org.otus.email.BasicEmailSender;

public class SystemConfigDao extends GenericDao {

	public Boolean isReady() {
		return exist(SystemConfig.class);
	}

	public SystemConfig fetchSystemConfig() {
		return (SystemConfig) notWaitingEmpty(getSingleResult("", SystemConfig.class));
	}

	public BasicEmailSender findEmailSender() {
		SystemConfig systemConfig = (SystemConfig) notWaitingEmpty(getSingleResult("", SystemConfig.class));
		return systemConfig.getEmailSender();
	}
}
