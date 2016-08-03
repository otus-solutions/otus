package br.org.otus.configuration.service;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.exceptions.AlreadyExistException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.exceptions.InvalidDtoException;

public interface SystemConfigService {

	Boolean isReady();

	void createAdmin(OtusInitializationConfigDto configDto) throws InvalidDtoException;

	void createInitialSystemConfig(OtusInitializationConfigDto configDto, String projectToken) throws Exception;

	String generateProjectToken();

	void verifyEmailService(OtusInitializationConfigDto initalizationData) throws EmailNotificationException;
	
	public void verificarConfiguracoesParaUsuarioAdministrador(OtusInitializationConfigDto initializationData) throws AlreadyExistException, EmailNotificationException;

	public void verificarConfiguracoesParaEmailSender(OtusInitializationConfigDto initializationData) throws AlreadyExistException, EmailNotificationException;

}
