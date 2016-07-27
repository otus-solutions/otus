package br.org.otus.configuration.service;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.exceptions.EmailNotificationException;

public interface SystemConfigService {

    Boolean isReady();

    void createInitialSystemConfig(OtusInitializationConfigDto configDto, String projectToken) throws Exception;

    String generateProjectToken();

    void verifyEmailService(OtusInitializationConfigDto initalizationData) throws EmailNotificationException;

}
