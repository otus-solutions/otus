package br.org.otus.security.dtos;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import com.nimbusds.jwt.JWTClaimsSet;

public interface AuthenticationData{
    String getUser();

    String getKey();

    String getMode();

    String getRequestAddress();

    void setRequestAddress(String requestAddress);

    void encrypt() throws EncryptedException;

    JWTClaimsSet buildClaimSet();

    Boolean isValid();
}
