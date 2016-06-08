package br.org.otus.configuration;

import br.org.otus.system.SystemConfigDao;
import br.org.otus.system.SystemConfig;
import br.org.otus.rest.dtos.OtusInitializationConfigDto;
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
    public UUID createInitialSystemConfig(OtusInitializationConfigDto configDto) throws Exception {
        SystemConfig systemConfig = new SystemConfig();
        Equalizer.equalize(configDto, systemConfig);
        systemConfigDao.persist(systemConfig);

        return systemConfig.getUuid();
    }
}
