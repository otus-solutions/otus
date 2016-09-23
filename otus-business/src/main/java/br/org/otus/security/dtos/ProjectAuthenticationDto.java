package br.org.otus.security.dtos;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.rest.dtos.Dto;
import com.nimbusds.jwt.JWTClaimsSet;

public class ProjectAuthenticationDto implements AuthenticationData, Dto {
    private static final String MODE = "client";

    public String user;
    public String accessToken;
    public String requestAddress;

    @Override
    public Boolean isValid() {
        return (!user.isEmpty() && user != null) && (!accessToken.isEmpty() && accessToken != null) && (requestAddress != null);
    }

    @Override
    public String getUser() {
        return user;
    }

    @Override
    public String getKey() {
        return accessToken;
    }

    @Override
    public String getMode() {
        return MODE;
    }

    @Override
    public String getRequestAddress() {
        return requestAddress;
    }

    @Override
    public void setRequestAddress(String requestAddress) {
        this.requestAddress = requestAddress;
    }

    @Override
    public void encrypt() throws EncryptedException {
    }

    @Override
    public JWTClaimsSet buildClaimSet() {
        JWTClaimsSet.Builder builder = new JWTClaimsSet.Builder();
        builder.issuer(user);
        builder.claim("mode", MODE);
        return builder.build();
    }
}
