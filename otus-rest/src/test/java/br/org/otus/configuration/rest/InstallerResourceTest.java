package br.org.otus.configuration.rest;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import br.org.otus.configuration.service.SystemConfigServiceBean;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.rest.Response;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ InstallerResource.class })
public class InstallerResourceTest {

	@InjectMocks
	private InstallerResource installerResource;
	
	@Mock
	private SystemConfigServiceBean systemConfigService;
	
	@Mock
	private Response response;
	
	private String JSON = "{" + "'user':" + "{" + "'name': 'teste'," + "'surname': 'teste'," + "'phone': '5555555555'," + "'email': 'teste@teste.com'," + "'password': 'minhaSenha'," + "'passwordConfirm': 'minhaSenha'" + "}," + "'project': {" + "'projectName': 'meu projeto'" + " }," + "'domain': {" + "'domainRestUrl': 'http://localhost/'" + "}," + "'emailSender': {" + "'name': 'teste'," + "'email': 'teste@teste.com'," + "'password': 'minhaSenha'," + "'passwordConfirm': 'minhaSenha'" + "}" + "}";
	
	@Ignore
	@Test
	public void method_validation_should_called_method_verifyEmailService() throws EmailNotificationException {
		installerResource.validation(JSON);
		
		Mockito.verify(systemConfigService).verifyEmailService(Mockito.any());
	}
	
}
