package br.org.otus.configuration;

import br.org.otus.rest.dtos.OtusConfig;

public interface SystemConfigService {
	
	Boolean isReady();
	
	void createInitialSystemConfig(OtusConfig systemConfigDto) throws Exception;
}
