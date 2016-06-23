package br.org.otus.security.services;


import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.TokenException;
import br.org.otus.security.dtos.AuthenticationDto;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface SecurityContextService {

    String generateToken(AuthenticationDto authenticationDto, byte[] secretKey) throws JOSEException;

    byte[] generateSecretKey();

    void addToken(String jwtSignedAndSerialized, byte[] secretKey);

    void removeToken(String jwtSignedAndSerialized) throws DataNotFoundException;

    void validateToken(String token) throws TokenException;

    String getUserId(String token) throws ParseException;
}
