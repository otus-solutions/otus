package br.org.otus.survey.builders.metadata;

import br.org.otus.survey.builders.label.LabelBuilder;
import br.org.otus.survey.dtos.item.questions.metadata.MetadataOptionDto;
import br.org.otus.survey.item.questions.metadata.MetadataOption;

public class MetadataOptionBuilder {

	private MetadataOption metadataOption;
	private LabelBuilder labelBuilder;

	public MetadataOptionBuilder() {
		labelBuilder = new LabelBuilder();
	}

	public MetadataOption build() {
		return this.metadataOption;
	}

	public MetadataOptionBuilder buildFromDto(MetadataOptionDto dto) {
		metadataOption = new MetadataOption(Integer.valueOf(dto.value));
		metadataOption.setLabel(labelBuilder.buildFromDto(dto.label).build());

		return this;
	}

}
