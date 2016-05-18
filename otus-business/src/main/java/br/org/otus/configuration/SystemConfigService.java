package br.org.otus.configuration;

import br.org.otus.rest.dtos.SystemConfigDto;

public interface SystemConfigService {
	
	Boolean isReady();
	
	void createInitialSystemConfig(SystemConfigDto systemConfigDto) throws Exception;
}
