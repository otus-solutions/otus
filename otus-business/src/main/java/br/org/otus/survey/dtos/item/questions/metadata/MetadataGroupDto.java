package br.org.otus.survey.dtos.item.questions.metadata;

import java.util.List;

import br.org.otus.rest.dtos.Dto;

public class MetadataGroupDto implements Dto {

	public String extents;

	public String objectType;

	public List<MetadataOptionDto> options;

	@Override
	public Boolean isValid() {
		return null;
	}

}
