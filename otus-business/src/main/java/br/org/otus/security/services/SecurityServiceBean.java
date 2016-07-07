package br.org.otus.security.services;

import br.org.otus.exceptions.*;
import br.org.otus.security.dtos.AuthenticationData;
import br.org.otus.system.SystemConfig;
import br.org.otus.system.SystemConfigDao;
import br.org.otus.user.User;
import br.org.otus.user.UserDao;
import com.nimbusds.jose.JOSEException;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
@Local(SecurityService.class)
public class SecurityServiceBean implements SecurityService {

    @Inject
    private UserDao userDao;

    @Inject
    private SystemConfigDao systemConfigDao;

    @Inject
    private SecurityContextService securityContextService;

    @Override
    public String authenticate(AuthenticationData authenticationData) throws InvalidPasswordException, EmailNotFoundException, UserDisabledException, TokenException {
        try {
            User user = userDao.fetchByEmail(authenticationData.getKey());

            if (user.getPassword().equals(authenticationData.getPassword())) {
                if (user.isEnable()) {
                    return initializeToken(authenticationData);
                } else {
                    throw new UserDisabledException();
                }
            } else {
                throw new InvalidPasswordException();
            }
        } catch (DataNotFoundException e) {
            throw new EmailNotFoundException();
        }
    }

    @Override
    public String projectAuthenticate(AuthenticationData authenticationData) throws InvalidDtoException, TokenException, InvalidPasswordException {
        try {
            SystemConfig systemConfig = systemConfigDao.fetchSystemConfig();
            String password = authenticationData.getPassword();

            if (authenticationData.isValid()) {
                if (systemConfig.getProjectToken().equals(password)) {
                    return initializeToken(authenticationData);

                } else {

                    throw new InvalidPasswordException();
                }
            } else {
                throw new InvalidDtoException();
            }
        } catch (DataNotFoundException e) {
            throw new TokenException();
        }
    }

    @Override
    public void invalidate(String token) {
        try {
            securityContextService.removeToken(token);
        } catch (FieldCenterNotFoundException e) {
        }
    }

    private String initializeToken(AuthenticationData authenticationData) throws TokenException {
        try {
            byte[] secretKey = securityContextService.generateSecretKey();
            String jwtSignedAndSerialized = securityContextService.generateToken(authenticationData, secretKey);
            securityContextService.addToken(jwtSignedAndSerialized, secretKey);

            return jwtSignedAndSerialized;
        } catch (JOSEException e) {
            throw new TokenException();
        }
    }

}
