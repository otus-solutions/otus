package br.org.otus.configuration;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;

import java.util.UUID;

public interface SystemConfigService {
	
	Boolean isReady();
	
	void createInitialSystemConfig(OtusInitializationConfigDto configDto, UUID projectToken) throws Exception;

	UUID generateProjectToken();
}
