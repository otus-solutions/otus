package br.org.otus.security.dtos;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.rest.dtos.Dto;
import br.org.otus.security.EncryptorResources;
import com.nimbusds.jwt.JWTClaimsSet;

public class AuthenticationDto implements Dto, AuthenticationData {
    private static final String MODE = "user";

    public String user;
    public String password;
    public String requestAddress;

    @Override
    public Boolean isValid() {
        return (!user.isEmpty() && user != null) && (!password.isEmpty() && password != null) && (requestAddress != null);
    }

    public void setEmail(String email) {
        this.user = email;
    }

    @Override
    public String getUser() {
        return user;
    }

    @Override
    public String getKey() {
        return password;
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
        this.password = EncryptorResources.encryptIrreversible(password);
    }

    @Override
    public JWTClaimsSet buildClaimSet() {
        JWTClaimsSet.Builder builder = new JWTClaimsSet.Builder();
        builder.issuer(user);
        builder.claim("mode", MODE);
        return builder.build();
    }
}
