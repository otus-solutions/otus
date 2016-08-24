package br.org.otus.configuration.service;

import br.org.otus.configuration.builder.SystemConfigBuilder;
import br.org.otus.configuration.builder.TokenBuilder;
import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.email.service.EmailNotifierServiceBean;
import br.org.otus.exceptions.webservice.common.AlreadyExistException;
import br.org.otus.exceptions.webservice.http.EmailNotificationException;
import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.system.SystemConfig;
import br.org.otus.system.SystemConfigDao;
import br.org.otus.user.api.UserFacade;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
@PrepareForTest({SystemConfigBuilder.class, TokenBuilder.class})
public class SystemConfigServiceBeanTest {

    @InjectMocks
    private SystemConfigServiceBean systemConfigServiceBean;

    @Mock
    private SystemConfigDao systemConfigDao;

    @Mock
    private UserFacade userFacade;

    @Mock
    private EmailNotifierServiceBean emailNotifierServiceBean;

    @Mock
    private OtusInitializationConfigDto otusInitializationConfigDto;

    @Mock
    private SystemConfig systemConfig;

    private String DUMMY_TOKEN = "TOKEN";

    @Test
    public void method_initConfiguration_should_check_if_isReady() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        PowerMockito.mockStatic(SystemConfigBuilder.class);
        Mockito.when(SystemConfigBuilder.builSystemConfig(otusInitializationConfigDto, DUMMY_TOKEN)).thenReturn(systemConfig);
        Mockito.when(systemConfigDao.isReady()).thenReturn(Boolean.FALSE);

        systemConfigServiceBean.initConfiguration(otusInitializationConfigDto, DUMMY_TOKEN);
        Mockito.verify(systemConfigDao).isReady();
    }

    @Test
    public void method_initConfiguration_should_verify_email_service() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        PowerMockito.mockStatic(SystemConfigBuilder.class);
        Mockito.when(SystemConfigBuilder.builSystemConfig(otusInitializationConfigDto, DUMMY_TOKEN)).thenReturn(systemConfig);
        Mockito.when(systemConfigDao.isReady()).thenReturn(Boolean.FALSE);

        systemConfigServiceBean.initConfiguration(otusInitializationConfigDto, DUMMY_TOKEN);
        Mockito.verify(emailNotifierServiceBean).sendSystemInstallationEmail(otusInitializationConfigDto);
    }

    @Test
    public void method_initConfiguration_should_build_system_config() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        PowerMockito.mockStatic(SystemConfigBuilder.class);
        Mockito.when(SystemConfigBuilder.builSystemConfig(otusInitializationConfigDto, DUMMY_TOKEN)).thenReturn(systemConfig);
        Mockito.when(systemConfigDao.isReady()).thenReturn(Boolean.FALSE);

        systemConfigServiceBean.initConfiguration(otusInitializationConfigDto, DUMMY_TOKEN);
        PowerMockito.verifyStatic(Mockito.times(1));
    }

    @Test
    public void method_initConfiguration_should_persist_systemConfig() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        PowerMockito.mockStatic(SystemConfigBuilder.class);
        Mockito.when(SystemConfigBuilder.builSystemConfig(otusInitializationConfigDto, DUMMY_TOKEN)).thenReturn(systemConfig);
        Mockito.when(systemConfigDao.isReady()).thenReturn(Boolean.FALSE);

        systemConfigServiceBean.initConfiguration(otusInitializationConfigDto, DUMMY_TOKEN);
        Mockito.verify(systemConfigDao).persist(systemConfig);
    }

    @Test
    public void method_initConfiguration_should_createUser() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        PowerMockito.mockStatic(SystemConfigBuilder.class);
        Mockito.when(SystemConfigBuilder.builSystemConfig(otusInitializationConfigDto, DUMMY_TOKEN)).thenReturn(systemConfig);
        Mockito.when(systemConfigDao.isReady()).thenReturn(Boolean.FALSE);

        systemConfigServiceBean.initConfiguration(otusInitializationConfigDto, DUMMY_TOKEN);
        Mockito.verify(userFacade).create(otusInitializationConfigDto);
    }

    @Test
    public void method_isReady_should_call_SystemConfig() {
        systemConfigServiceBean.isReady();
        Mockito.verify(systemConfigDao).isReady();
    }

    @Test
    public void method_buildToken_should_call_tokenBuilder() {
        PowerMockito.mockStatic(TokenBuilder.class);
        systemConfigServiceBean.buildToken();
        PowerMockito.verifyStatic(Mockito.times(1));
    }
}
