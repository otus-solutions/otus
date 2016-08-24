package br.org.otus.security.dtos;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.tutty.Equalization;

public class ProjectAuthenticationDto implements AuthenticationData {
    @Equalization(name = "projectToken")
    public String projectToken;

    @Equalization(name = "projectName")
    public String projectName;

    @Override
    public Boolean isValid() {
        return projectToken != null;
    }


    @Override
    public String getKey() {
        return projectToken.toString().trim();
    }

    @Override
    public String getPassword() {
        return projectToken.toString().trim();
    }

    @Override
    public String getIssuer() {
        return "PROJECT_AUTHENTICATION";
    }

    @Override
    public void encrypt() throws EncryptedException{
    }
}
