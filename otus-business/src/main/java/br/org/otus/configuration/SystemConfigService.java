package br.org.otus.configuration;

import br.org.otus.rest.dtos.OtusConfigDto;

public interface SystemConfigService {
	
	Boolean isReady();
	
	void createInitialSystemConfig(OtusConfigDto configDto) throws Exception;
}
