package br.org.otus.configuration;

import br.org.otus.system.SystemConfigDao;
import br.org.otus.system.SystemConfig;
import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.tutty.Equalizer;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.UUID;

@Stateless
public class SystemConfigServiceBean implements SystemConfigService{
    @Inject
    private SystemConfigDao systemConfigDao;

    @Override
    public Boolean isReady() {
        return systemConfigDao.isReady();
    }

    @Override
    public void createInitialSystemConfig(OtusInitializationConfigDto configDto, String projectToken) throws Exception {
        SystemConfig systemConfig = new SystemConfig();
        Equalizer.equalize(configDto, systemConfig);

        systemConfig.setProjectToken(projectToken);
        systemConfigDao.persist(systemConfig);
    }

    @Override
    public String generateProjectToken(){
       return UUID.randomUUID().toString();
    }
}
