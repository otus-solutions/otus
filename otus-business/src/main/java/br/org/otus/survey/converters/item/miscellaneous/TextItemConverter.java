package br.org.otus.survey.converters.item.miscellaneous;

import br.org.otus.survey.converters.item.SurveyItemConverter;
import br.org.otus.survey.converters.label.LabelConverter;
import br.org.otus.survey.dtos.item.miscellaneous.TextItemDto;
import br.org.otus.survey.item.miscellaneous.TextItem;

public class TextItemConverter implements SurveyItemConverter<TextItemDto, TextItem> {

	private LabelConverter labelConverter;

	public TextItemConverter() {
		labelConverter = new LabelConverter();
	}

	@Override
	public TextItem convertFromDto(TextItemDto dto) {
		TextItem textItem = new TextItem(dto.templateID, dto.customID);
		textItem.setValue(labelConverter.convertFromDto(dto.value));

		return textItem;
	}

}
