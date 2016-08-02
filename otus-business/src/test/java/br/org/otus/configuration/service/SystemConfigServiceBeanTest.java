package br.org.otus.configuration.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.google.gson.Gson;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.exceptions.InvalidDtoException;
import br.org.otus.system.SystemConfigDao;

@RunWith(PowerMockRunner.class)
public class SystemConfigServiceBeanTest {

	@InjectMocks
	private SystemConfigServiceBean systemConfigServiceBean;

	@Mock
	private SystemConfigDao systemConfigDao;

	@Mock
	private SystemConfigService systemConfigService;

	@Mock
	private OtusInitializationConfigDto otusInitializationConfigDto;	
	
	@Mock
	private String projectToken;
	
	@Mock
	private EmailNotifierService emailNotifierService;
	
	private String json = "{" + "'user':" + "{" + "'name': 'teste'," + "'surname': 'teste'," + "'phone': '5555555555'," + "'email': 'teste@teste.com'," + "'password': 'minhaSenha'," + "'passwordConfirm': 'minhaSenha'" + "}," + "'project': {" + "'projectName': 'meu projeto'" + " }," + "'domain': {" + "'domainRestUrl': 'http://localhost/'" + "}," + "'emailSender': {" + "'name': 'teste'," + "'email': 'teste@teste.com'," + "'password': 'minhaSenha'," + "'passwordConfirm': 'minhaSenha'" + "}" + "}";

	@Test
	public void method_isReady_should_calls_database_and_verify() {
		systemConfigServiceBean.isReady();

		Mockito.verify(systemConfigDao).isReady();
	}

	@Test
	public void method_createAdmin_should_called_method_for_persist_User() throws InvalidDtoException {
		OtusInitializationConfigDto initializationConfigDto = new Gson().fromJson(json, OtusInitializationConfigDto.class);
		systemConfigServiceBean.createAdmin(initializationConfigDto);
		
		Mockito.verify(systemConfigDao).persist(Mockito.any());
	}
	
	@Test
	public void method_createInitialSystemConfig_should_called_method_persist_for_object_SystemConfig() throws Exception {
		OtusInitializationConfigDto initializationConfigDto = new Gson().fromJson(json, OtusInitializationConfigDto.class);
		projectToken = systemConfigServiceBean.generateProjectToken();
		systemConfigServiceBean.createInitialSystemConfig(initializationConfigDto, projectToken);
		
		Mockito.verify(systemConfigDao, Mockito.times(2)).persist(Mockito.any());
	}
	
	@Test
	public void method_verifyEmailService_should_called_method_sendWelcomeEmail() throws EmailNotificationException, DataNotFoundException {
		OtusInitializationConfigDto initializationConfigDto = new Gson().fromJson(json, OtusInitializationConfigDto.class);
		systemConfigServiceBean.verifyEmailService(initializationConfigDto);
		
		Mockito.verify(emailNotifierService).sendSystemInstallationEmail(initializationConfigDto);
	}

}
