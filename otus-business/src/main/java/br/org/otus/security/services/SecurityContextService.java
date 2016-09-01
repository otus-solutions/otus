package br.org.otus.security.services;


import java.text.ParseException;

import com.nimbusds.jose.JOSEException;

import br.org.otus.exceptions.FieldCenterNotFoundException;
import br.org.otus.exceptions.TokenException;
import br.org.otus.security.dtos.AuthenticationData;

public interface SecurityContextService {

    String generateToken(AuthenticationData authenticationData, byte[] secretKey) throws JOSEException;

    byte[] generateSecretKey();

    void addToken(String jwtSignedAndSerialized, byte[] secretKey);

    void removeToken(String jwtSignedAndSerialized) throws FieldCenterNotFoundException;

    void validateToken(String token) throws TokenException;

    String getUserId(String token) throws ParseException;
}
