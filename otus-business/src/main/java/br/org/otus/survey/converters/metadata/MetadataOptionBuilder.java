package br.org.otus.survey.converters.metadata;

import br.org.otus.survey.converters.label.LabelConverter;
import br.org.otus.survey.dtos.item.questions.metadata.MetadataOptionDto;
import br.org.otus.survey.item.questions.metadata.MetadataOption;

public class MetadataOptionBuilder {

	private MetadataOption metadataOption;
	private LabelConverter labelConverter;

	public MetadataOptionBuilder() {
		labelConverter = new LabelConverter();
	}

	public MetadataOption build() {
		return this.metadataOption;
	}

	public MetadataOptionBuilder buildFromDto(MetadataOptionDto dto) {
		metadataOption = new MetadataOption(Integer.valueOf(dto.value));
		metadataOption.setLabel(labelConverter.convertFromDto(dto.label));

		return this;
	}
	
	

}
