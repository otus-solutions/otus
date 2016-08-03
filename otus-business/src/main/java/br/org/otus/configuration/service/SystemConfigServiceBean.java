package br.org.otus.configuration.service;

import java.util.UUID;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.email.BasicEmailSender;
import br.org.otus.email.OtusEmail;
import br.org.otus.email.OtusEmailFactory;
import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.email.validation.EmailConstraint;
import br.org.otus.exceptions.AlreadyExistException;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.exceptions.InvalidDtoException;
import br.org.otus.system.SystemConfig;
import br.org.otus.system.SystemConfigDao;
import br.org.otus.user.User;
import br.org.owail.sender.email.Recipient;
import br.org.owail.sender.email.Sender;
import br.org.tutty.Equalizer;

@Stateless
@Local(SystemConfigService.class)
public class SystemConfigServiceBean implements SystemConfigService {
	@Inject
	private SystemConfigDao systemConfigDao;

	@Inject
	private EmailConstraint emailConstraint;

	@Inject
	private EmailNotifierService emailNotifierService;

	@Override
	public Boolean isReady() {
		return systemConfigDao.isReady();
	}

	@Override
	public void createAdmin(OtusInitializationConfigDto configDto) throws InvalidDtoException {
		try {
			User user = new User();

			configDto.getUser().encrypt();
			Equalizer.equalize(configDto.getUser(), user);

			user.becomesAdm();
			systemConfigDao.persist(user);

		} catch (Exception e) {
			throw new InvalidDtoException();
		}
	}

	@Override
	public void createInitialSystemConfig(OtusInitializationConfigDto configDto, String projectToken) throws Exception {
		SystemConfig systemConfig = new SystemConfig();

		configDto.getEmailSender();
		Equalizer.equalize(configDto.getProject(), systemConfig);
		Equalizer.equalize(configDto.getDomainDto(), systemConfig);
		Equalizer.equalize(configDto.getEmailSender(), systemConfig.getEmailSender());
		createAdmin(configDto);

		systemConfig.setProjectToken(projectToken);
		systemConfigDao.persist(systemConfig);
	}

	@Override
	public String generateProjectToken() {
		return UUID.randomUUID().toString();
	}

	@Override
	public void verifyEmailService(OtusInitializationConfigDto initializationData) throws EmailNotificationException {
		try {
			//verfyEmailSender(initializationData);
			emailNotifierService.sendSystemInstallationEmail(initializationData);
		} catch (EmailNotificationException | DataNotFoundException e) {
			throw new EmailNotificationException(e);
		}
	}

	public void verificarConfiguracoesParaUsuarioAdministrador(OtusInitializationConfigDto initializationData) throws AlreadyExistException, EmailNotificationException {
		// TODO: verificar se já existe
		if(!emailConstraint.isUnique(initializationData.getUser().getEmail())){
			throw new AlreadyExistException();
		}
		// TODO: verificar se consegue mandar email
		BasicEmailSender emailSenderDto = new BasicEmailSender();
		Equalizer.equalize(initializationData.getEmailSender(), emailSenderDto);
		Recipient recipient = Recipient.createTO(initializationData.getUser().getName(), initializationData.getUser().getEmail());
		Sender sender = new Sender(emailSenderDto.getName(), emailSenderDto.getEmail(), emailSenderDto.getPassword());
		OtusEmail email = OtusEmailFactory.createSystemInstallationEmail(sender, recipient);
		
		try {
			emailNotifierService.sendEmailSync(email);
		} catch (EmailNotificationException e) {
			throw new EmailNotificationException();
		}

	}
	
	public void verificarConfiguracoesParaEmailSender(OtusInitializationConfigDto initializationData) throws AlreadyExistException, EmailNotificationException {
		// TODO: verificar se já existe
		if(!emailConstraint.isUnique(initializationData.getEmailSender().getEmail())){
			throw new AlreadyExistException();
		}
		// TODO: verificar se consegue mandar email
		BasicEmailSender userAdminDto = new BasicEmailSender();
		Equalizer.equalize(initializationData.getUser(), userAdminDto);
		Recipient recipient = Recipient.createTO(initializationData.getEmailSender().getName(), initializationData.getEmailSender().getPassword());
		Sender sender = new Sender(userAdminDto.getName(), userAdminDto.getEmail(), userAdminDto.getPassword());
		OtusEmail email = OtusEmailFactory.createSystemInstallationEmail(sender, recipient);
		
		try {
			emailNotifierService.sendEmailSync(email);
		} catch (EmailNotificationException e) {
			throw new EmailNotificationException();
		}

	}
}
