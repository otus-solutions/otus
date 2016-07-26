package br.org.otus.configuration.service;


import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.email.dto.EmailSenderDto;
import br.org.otus.exceptions.EmailNotificationException;

public interface SystemConfigService {
	
	Boolean isReady();
	
	void createInitialSystemConfig(OtusInitializationConfigDto configDto, String projectToken) throws Exception;

	String generateProjectToken();
	
    void verifyEmailService(EmailSenderDto emailSenderDto) throws EmailNotificationException;
}
