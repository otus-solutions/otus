package br.org.otus.security.context;

import br.org.otus.security.dtos.AuthenticationData;
import com.google.gson.Gson;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.ccem.auditor.model.SessionLog;

import java.text.ParseException;

public class SessionIdentifier {
    private final String token;
    private final byte[] secretKey;
    private final AuthenticationData authenticationData;

    public SessionIdentifier(String token, byte[] secretKey, AuthenticationData authenticationData) {
        this.token = token;
        this.secretKey = secretKey;
        this.authenticationData = authenticationData;
    }

    public SessionLog buildLog() {
        SessionLog sessionLog = new SessionLog(authenticationData.getUser(), authenticationData.getKey(), authenticationData.getMode());
        sessionLog.setToken(token);
        sessionLog.setSecretKey(secretKey);
        sessionLog.setRequestAddress(authenticationData.getRequestAddress());
        return sessionLog;
    }

    public String getToken() {
        return token;
    }

    public byte[] getSecretKey() {
        return secretKey;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SessionIdentifier that = (SessionIdentifier) o;

        return token != null ? token.equals(that.token) : that.token == null;

    }

    public JWTClaimsSet getClaims() throws ParseException {
        SignedJWT signedJWT = SignedJWT.parse(token);
        return signedJWT.getJWTClaimsSet();
    }

    @Override
    public int hashCode() {
        return token != null ? token.hashCode() : 0;
    }

	public AuthenticationData getAuthenticationData() {
		return authenticationData;
	}

}
