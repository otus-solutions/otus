package br.org.otus.configuration.dto;

import br.org.tutty.Equalization;

public class DomainDto {

	@Equalization(name = "domain_rest_url")
	private String domainRestUrl;

	public String getDomainRestUrl() {
		return domainRestUrl;
	}

	public void setDomainRestUrl(String domainRestUrl) {
		this.domainRestUrl = domainRestUrl;
	}

}
