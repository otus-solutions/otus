package br.org.otus.security.dtos;

import br.org.tutty.Equalization;

public class ProjectAuthenticationDto implements AuthenticationData {
    @Equalization(name = "projectToken")
    private String projectToken;

    @Equalization(name = "projectName")
    private String projectName;

    public void setProjectToken(String projectToken) {
        this.projectToken = projectToken;
    }

    @Override
    public Boolean isValid() {
        return projectToken != null;
    }

    @Override
    public void encrypt() {
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
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
}
