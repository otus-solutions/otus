package br.org.otus.configuration.rest;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

import javax.servlet.http.HttpServletRequest;

import org.junit.Before;
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
	private HttpServletRequest request;
	
	@Mock
	private Response response;
	
	private Response trueResponse;
	
	private String JSON = "{" + "'user':" + "{" + "'name': 'teste'," + "'surname': 'teste'," + "'phone': '5555555555'," + "'email': 'teste@teste.com'," + "'password': 'minhaSenha'," + "'passwordConfirm': 'minhaSenha'" + "}," + "'project': {" + "'projectName': 'meu projeto'" + " }," + "'domain': {" + "'domainRestUrl': 'http://localhost/'" + "}," + "'emailSender': {" + "'name': 'teste'," + "'email': 'teste@teste.com'," + "'password': 'minhaSenha'," + "'passwordConfirm': 'minhaSenha'" + "}" + "}";
	
	@Before
	public void setup() {
		trueResponse = new Response();
		trueResponse.setData(true);
	}
	
	@Test
	public void method_validation_should_called_method_verifyEmailService() throws EmailNotificationException {
		installerResource.validation(JSON);
		
		Mockito.verify(systemConfigService).verifyEmailService(Mockito.any());
	}
	
	@Ignore
	@Test
	public void method_validation_should_return_response_with_setData_true_when_verifyEmailService_no_occur_error() {
		String restReturn = installerResource.validation(JSON);
		
		assertThat(trueResponse.toString(), equalTo(restReturn));
	}
	
}
