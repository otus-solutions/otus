package br.org.otus.configuration.service;

import java.util.UUID;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.system.SystemConfig;
import br.org.otus.system.SystemConfigDao;
import br.org.tutty.Equalizer;

@Stateless
@Local(SystemConfigService.class)
public class SystemConfigServiceBean implements SystemConfigService {
	@Inject
	private SystemConfigDao systemConfigDao;

	@Inject
	private EmailNotifierService emailNotifierService;

	@Override
	public Boolean isReady() {
		return systemConfigDao.isReady();
	}

	@Override
	public void createInitialSystemConfig(OtusInitializationConfigDto configDto, String projectToken) throws Exception {
		SystemConfig systemConfig = new SystemConfig();
		Equalizer.equalize(configDto, systemConfig);

		systemConfig.setProjectToken(projectToken);
		systemConfigDao.persist(systemConfig);
	}

	@Override
	public String generateProjectToken() {
		return UUID.randomUUID().toString();
	}

	@Override
    public void verifyEmailService(OtusInitializationConfigDto intializationData) throws EmailNotificationException {
		try {
			emailNotifierService.sendWelcomeEmail(intializationData.getUser());
		} catch (EmailNotificationException | DataNotFoundException e) {
			throw new EmailNotificationException(e);
		}
	}
}
