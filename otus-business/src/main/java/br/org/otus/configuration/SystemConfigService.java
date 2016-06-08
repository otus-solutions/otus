package br.org.otus.configuration;

import br.org.otus.rest.dtos.OtusInitializationConfigDto;

import java.util.UUID;

public interface SystemConfigService {
	
	Boolean isReady();
	
	void createInitialSystemConfig(OtusInitializationConfigDto configDto, UUID projectToken) throws Exception;

	UUID generateProjectToken();
}
