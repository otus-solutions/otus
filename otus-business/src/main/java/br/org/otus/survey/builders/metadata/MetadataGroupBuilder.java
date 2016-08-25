package br.org.otus.survey.builders.metadata;

import br.org.otus.survey.dtos.item.questions.metadata.MetadataGroupDto;
import br.org.otus.survey.dtos.item.questions.metadata.MetadataOptionDto;
import br.org.otus.survey.item.questions.metadata.MetadataGroup;

public class MetadataGroupBuilder {
	
	private MetadataGroup metadataGroup;
	
	private MetadataOptionBuilder metadataOptionBuilder;
	
	public MetadataGroupBuilder() {
		metadataGroup = new MetadataGroup();
		metadataOptionBuilder = new MetadataOptionBuilder();
	}
	
	public MetadataGroup build() {
		return this.metadataGroup;
	}
	
	public MetadataGroupBuilder buildFromDto(MetadataGroupDto dto) {
		metadataGroup.setExtents(dto.extents);
		metadataGroup.setObjectType(dto.objectType);
		for (MetadataOptionDto optionDto : dto.options) {
			metadataGroup.getOptions().add(metadataOptionBuilder.buildFromDto(optionDto).build());
		}
		
		return this;
	}

}
