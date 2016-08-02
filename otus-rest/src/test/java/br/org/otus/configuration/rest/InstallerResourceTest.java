package br.org.otus.configuration.rest;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.google.gson.Gson;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.configuration.service.SystemConfigService;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.rest.Response;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ InstallerResource.class })
public class InstallerResourceTest {

	@InjectMocks
	private InstallerResource installerResource;
	
	@Mock
	private SystemConfigService systemConfigService;
	
	@Mock
	private Response response;
	
	private String JSON = "{" + "'user':" + "{" + "'name': 'teste'," + "'surname': 'teste'," + "'phone': '5555555555'," + "'email': 'teste@teste.com'," + "'password': 'minhaSenha'," + "'passwordConfirm': 'minhaSenha'" + "}," + "'project': {" + "'projectName': 'meu projeto'" + " }," + "'domain': {" + "'domainRestUrl': 'http://localhost/'" + "}," + "'emailSender': {" + "'name': 'teste'," + "'email': 'teste@teste.com'," + "'password': 'minhaSenha'," + "'passwordConfirm': 'minhaSenha'" + "}" + "}";

	@Ignore
	@Test
	public void method_validation_should_called_method_verifyEmailService() throws EmailNotificationException {
		OtusInitializationConfigDto initializationConfigDto = new Gson().fromJson(JSON, OtusInitializationConfigDto.class);
		installerResource.validation(JSON);
		
		Mockito.verify(systemConfigService).verifyEmailService(initializationConfigDto);
	}
	
	@Test
	public void method_validation_should_to_assign_TRUE_when_no_to_occur_exception() {
		installerResource.validation(JSON);
		
		Mockito.verify(response).setData(Boolean.TRUE);
	}
}
