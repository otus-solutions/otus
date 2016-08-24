package br.org.otus.security.services;

import br.org.otus.exceptions.webservice.common.DataNotFoundException;
import br.org.otus.exceptions.webservice.security.TokenException;
import br.org.otus.security.context.SecurityContext;
import br.org.otus.security.dtos.AuthenticationData;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.security.SecureRandom;
import java.text.ParseException;

@Stateless
public class SecurityContextServiceBean implements SecurityContextService {

    @Inject
    private SecurityContext securityContext;

    @Override
    public String generateToken(AuthenticationData authenticationData, byte[] secretKey) throws TokenException {
        try{
            JWSSigner signer = new MACSigner(secretKey);

            SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), generateClaimsSet(authenticationData));
            signedJWT.sign(signer);

            return signedJWT.serialize();
        } catch (JOSEException e) {
            throw new TokenException(e);
        }
    }

    private JWTClaimsSet generateClaimsSet(AuthenticationData authenticationData) {
        JWTClaimsSet.Builder builder = new JWTClaimsSet.Builder();
        builder.subject(authenticationData.getKey());
        builder.issuer(authenticationData.getIssuer());

        return builder.build();
    }

    @Override
    public byte[] generateSecretKey() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] sharedSecret = new byte[32];
        secureRandom.nextBytes(sharedSecret);

        return sharedSecret;
    }

    @Override
    public void addToken(String token, byte[] secretKey) {
        securityContext.add(token, secretKey);
    }

    @Override
    public void removeToken(String token) {
        securityContext.remove(token);
    }

    @Override
    public void validateToken(String token) throws TokenException {
        try {
            if (securityContext.hasToken(token)) {
                securityContext.verifySignature(token);
            } else {
                throw new TokenException(new DataNotFoundException());
            }
        } catch (ParseException | JOSEException e) {
            throw new TokenException(e);
        }
    }
}
