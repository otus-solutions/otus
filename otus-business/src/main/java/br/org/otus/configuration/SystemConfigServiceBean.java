package br.org.otus.configuration;

import br.org.otus.dao.SystemConfigDao;
import br.org.otus.entities.SystemConfig;
import br.org.otus.rest.dtos.OtusConfigDto;
import br.org.tutty.Equalizer;

import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class SystemConfigServiceBean implements SystemConfigService{
    @Inject
    private SystemConfigDao systemConfigDao;

    @Override
    public Boolean isReady() {
        return systemConfigDao.isReady();
    }

    @Override
    public void createInitialSystemConfig(OtusConfigDto configDto) throws Exception {
        SystemConfig systemConfig = new SystemConfig();
        Equalizer.equalize(configDto, systemConfig);
        systemConfigDao.persist(systemConfig);
    }
}
