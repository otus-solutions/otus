package br.org.otus.security.context;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.SignedJWT;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import java.text.ParseException;
import java.util.HashSet;
import java.util.Set;

@ApplicationScoped
public class SecurityContext{
    private Set<SessionIdentifier> sessions;

    @PostConstruct
    public void setUp() {
        this.sessions = new HashSet<>();
    }

    public void addSession(SessionIdentifier sessionIdentifier){
        sessions.add(sessionIdentifier);
    }

    public void removeSession(String token){
        String tokenWithoutPrefix = token.substring("Bearer".length()).trim();
        sessions.removeIf(session -> session.getToken().equals(tokenWithoutPrefix));
    }

    public SessionIdentifier getSession(String token){
        return sessions.stream().filter(session -> session.getToken().equals(token)).findFirst().get();
    }


    public Boolean hasToken(String token) {
        return sessions.stream().anyMatch(session -> session.getToken().equals(token));
    }

    public Boolean verifySignature(String token) throws ParseException, JOSEException {
        SignedJWT signedJWT = SignedJWT.parse(token);
        SessionIdentifier session = getSession(token);
        byte[] sharedSecret = session.getSecretKey();
        JWSVerifier verifier = new MACVerifier(sharedSecret);
        return signedJWT.verify(verifier);
    }
}
