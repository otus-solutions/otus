package br.org.otus.survey.dtos.metainfo;

import br.org.otus.rest.dtos.Dto;

public class MetaInfoDto implements Dto {
	
	public String extents;

	public String objectType;
	
	public String creationDatetime;

	public String otusStudioVersion;

	@Override
	public Boolean isValid() {
		return true;
	}

}
