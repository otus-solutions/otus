package br.org.otus.rest.dtos;

import br.org.tutty.Equalization;

public class OtusConfigDto {

    @Equalization(name = "project_name")
    private String projectName;

    @Equalization(name = "domain_url")
    private String domainUrl;
    
}
