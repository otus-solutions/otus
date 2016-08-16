package br.org.otus.survey.dto.metainfo;

import br.org.otus.rest.dtos.Dto;
import br.org.tutty.Equalization;

public class MetaInfoDto implements Dto {
	
	@Equalization(name = "extents")
	public String extents;

	@Equalization(name = "objectType")
	public String objectType;
	
	@Equalization(name = "creationDatetime")
	public String creationDatetime;

	@Equalization(name = "otusStudioVersion")
	public String otusStudioVersion;

	@Override
	public Boolean isValid() {
		return true;
	}

}
