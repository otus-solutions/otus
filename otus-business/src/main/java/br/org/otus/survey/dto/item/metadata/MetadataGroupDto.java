package br.org.otus.survey.dto.item.metadata;

import java.util.List;

import br.org.otus.rest.dtos.Dto;
import br.org.tutty.Equalization;

public class MetadataGroupDto implements Dto {
	
	@Equalization(name = "extents")
	public String extents;

	@Equalization(name = "objectType")
	public String objectType;

	@Equalization(name = "options")
    public List<MetadataOptionsDto> options;

	@Override
	public Boolean isValid() {
		return null;
	}

}
