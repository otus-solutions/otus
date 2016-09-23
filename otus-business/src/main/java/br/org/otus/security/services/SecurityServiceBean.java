package br.org.otus.security.services;

import br.org.otus.exceptions.webservice.security.AuthenticationException;
import br.org.otus.exceptions.webservice.security.TokenException;
import br.org.otus.security.context.SessionIdentifier;
import br.org.otus.security.dtos.AuthenticationData;
import br.org.otus.security.dtos.UserSecurityAuthorizationDto;
import br.org.otus.system.SystemConfig;
import br.org.otus.system.SystemConfigDao;
import br.org.otus.user.User;
import br.org.otus.user.UserDao;
import br.org.tutty.Equalizer;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.NoResultException;

@Stateless
public class SecurityServiceBean implements SecurityService {

    @Inject
    private UserDao userDao;

    @Inject
    private SystemConfigDao systemConfigDao;

    @Inject
    private SecurityContextService securityContextService;

    @Override
    public UserSecurityAuthorizationDto authenticate(AuthenticationData authenticationData) throws TokenException, AuthenticationException {
        try {
            User user = userDao.fetchByEmail(authenticationData.getUser());

            if (user.getPassword().equals(authenticationData.getKey())) {
                if (user.isEnable()) {
                    UserSecurityAuthorizationDto userSecurityAuthorizationDto = new UserSecurityAuthorizationDto();
                    Equalizer.equalize(user, userSecurityAuthorizationDto);

                    String token = initializeToken(authenticationData);
                    userSecurityAuthorizationDto.setToken(token);
                    return userSecurityAuthorizationDto;

                } else {
                    throw new AuthenticationException();
                }
            } else {
                throw new AuthenticationException();
            }
        } catch (NoResultException e) {
            throw new AuthenticationException();
        }
    }

    @Override
    public String projectAuthenticate(AuthenticationData authenticationData) throws TokenException, AuthenticationException {
        try {
            SystemConfig systemConfig = systemConfigDao.fetchSystemConfig();
            String password = authenticationData.getKey();

            if (authenticationData.isValid()) {
                if (systemConfig.getProjectToken().equals(password)) {
                    return initializeToken(authenticationData);

                } else {
                    throw new AuthenticationException();
                }
            } else {
                throw new AuthenticationException();
            }
        } catch (NoResultException e) {
            throw new AuthenticationException(e);
        }
    }

    @Override
    public void invalidate(String token) {
        securityContextService.removeToken(token);
    }

    private String initializeToken(AuthenticationData authenticationData) throws TokenException {
        byte[] secretKey = securityContextService.generateSecretKey();
        String jwtSignedAndSerialized = securityContextService.generateToken(authenticationData, secretKey);
        SessionIdentifier sessionIdentifier = new SessionIdentifier(jwtSignedAndSerialized, secretKey, authenticationData);
        securityContextService.addSession(sessionIdentifier);

        return jwtSignedAndSerialized;
    }

}
