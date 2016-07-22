package br.org.otus.configuration.dto;

import br.org.tutty.Equalization;

public class OtusInitializationConfigDto {
	
    @Equalization(name = "user_email")
    private String userEmail;
	
    @Equalization(name = "user_password")
    private String userPassword;

    @Equalization(name = "project_name")
    private String projectName;

    @Equalization(name = "domain_rest_url")
    private String domainRestUrl;

    public String getDomainRestUrl() {
        return domainRestUrl;
    }

    public void setDomainRestUrl(String domainRestUrl) {
        this.domainRestUrl = domainRestUrl;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}        
}
