package br.org.otus.domain;

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
