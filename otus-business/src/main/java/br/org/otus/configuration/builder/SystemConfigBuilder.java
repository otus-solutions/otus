package br.org.otus.configuration.builder;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.system.SystemConfig;
import br.org.otus.user.User;
import br.org.tutty.Equalizer;

public class SystemConfigBuilder {

    public static User buildInitialUser(OtusInitializationConfigDto otusInitializationConfigDto) {
        User user = new User();
        Equalizer.equalize(otusInitializationConfigDto.getUser(), user);
        user.becomesAdm();

        return user;
    }

    public static SystemConfig builSystemConfig(OtusInitializationConfigDto otusInitializationConfigDto, String projectToken) {
        SystemConfig systemConfig = new SystemConfig();

        Equalizer.equalize(otusInitializationConfigDto.getProject(), systemConfig);
        Equalizer.equalize(otusInitializationConfigDto.getDomainDto(), systemConfig);
        Equalizer.equalize(otusInitializationConfigDto.getEmailSender(), systemConfig.getEmailSender());
        systemConfig.setProjectToken(projectToken);

        return systemConfig;
    }
}
