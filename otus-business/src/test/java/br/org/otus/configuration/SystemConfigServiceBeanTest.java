package br.org.otus.configuration;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.modules.junit4.PowerMockRunner;

import br.org.otus.configuration.SystemConfigServiceBean;
import br.org.otus.dao.SystemConfigDao;

@RunWith(PowerMockRunner.class)
public class SystemConfigServiceBeanTest {

	@InjectMocks
	private SystemConfigServiceBean systemConfigServiceBean;
	
	@Mock
	private SystemConfigDao systemConfigDao;
	
	@Test
	public void method_isReady_should_calls_database_and_verify(){
		systemConfigServiceBean.isReady();
		
		Mockito.verify(systemConfigDao).isReady();
	}
}
