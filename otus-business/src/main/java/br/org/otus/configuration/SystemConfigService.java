package br.org.otus.configuration;

import br.org.otus.rest.dtos.OtusInitializationConfigDto;

import java.util.UUID;

public interface SystemConfigService {
	
	Boolean isReady();
	
	UUID createInitialSystemConfig(OtusInitializationConfigDto configDto) throws Exception;
}
