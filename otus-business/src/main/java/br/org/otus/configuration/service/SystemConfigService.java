package br.org.otus.configuration.service;


import br.org.otus.configuration.dto.OtusInitializationConfigDto;

public interface SystemConfigService {
	
	Boolean isReady();
	
	void createInitialSystemConfig(OtusInitializationConfigDto configDto, String projectToken) throws Exception;

	String generateProjectToken();
}
