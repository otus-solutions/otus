package br.org.otus.security.dtos;

import br.org.tutty.Equalization;

public class ProjectAuthenticationDto implements AuthenticationData {
    @Equalization(name = "token")
    private String token;

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public Boolean isValid() {
        return token != null;
    }

    @Override
    public String getKey() {
        return token.toString().trim();
    }

    @Override
    public String getPassword() {
        return token.toString().trim();
    }

    @Override
    public String getIssuer() {
        // TODO
        return null;
    }
}
