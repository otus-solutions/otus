package br.org.otus.security.services;

import br.org.otus.exceptions.FieldCenterNotFoundException;
import br.org.otus.exceptions.TokenException;
import br.org.otus.security.context.SecurityContext;
import br.org.otus.security.dtos.AuthenticationData;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.security.SecureRandom;
import java.text.ParseException;

@Stateless
@Local(SecurityContextService.class)
public class SecurityContextServiceBean implements SecurityContextService {

	@Inject
	private SecurityContext securityContext;

	@Override
	public String generateToken(AuthenticationData authenticationData, byte[] secretKey) throws JOSEException {
		JWSSigner signer = new MACSigner(secretKey);

		SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), generateClaimsSet(authenticationData));
		signedJWT.sign(signer);

		return signedJWT.serialize();
	}

	private JWTClaimsSet generateClaimsSet(AuthenticationData authenticationData){
		JWTClaimsSet.Builder builder = new JWTClaimsSet.Builder();
		builder.subject(authenticationData.getKey());
		builder.issuer(authenticationData.getIssuer());

		return builder.build();
	}

	@Override
	public byte[] generateSecretKey(){
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
	public void removeToken(String token) throws FieldCenterNotFoundException {
		try {
			securityContext.remove(token);
		} catch (ParseException e) {
			throw new FieldCenterNotFoundException();
		}
	}

	@Override
	public void validateToken(String token) throws TokenException {
		try {
			if(securityContext.hasToken(token)){
				securityContext.verifySignature(token);
			}else {
				throw new TokenException();
			}
		} catch (ParseException | JOSEException e) {
			throw new TokenException();
		}
	}

	@Override
	public String getUserId(String token) throws ParseException {
		return securityContext.getUserId(token);
	}
}
