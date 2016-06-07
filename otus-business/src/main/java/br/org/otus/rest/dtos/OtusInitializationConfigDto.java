package br.org.otus.rest.dtos;

import br.org.tutty.Equalization;

public class OtusInitializationConfigDto {

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
    
    
}
