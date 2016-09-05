package br.org.otus.survey.converters.item.miscellaneous;

import br.org.otus.survey.converters.item.SurveyItemConverter;
import br.org.otus.survey.converters.label.LabelConverter;
import br.org.otus.survey.dtos.item.miscellaneous.ImageItemDto;
import br.org.otus.survey.item.miscellaneous.ImageItem;

public class ImageItemConverter implements SurveyItemConverter<ImageItemDto, ImageItem> {

	private LabelConverter labelConverter;

	public ImageItemConverter() {
		labelConverter = new LabelConverter();
	}

	@Override
	public ImageItem convertFromDto(ImageItemDto dto) {
		ImageItem imageItem = new ImageItem(dto.templateID, dto.customID);
		imageItem.setFooter(labelConverter.convertFromDto(dto.footer));
		imageItem.setUrl(dto.url);

		return imageItem;
	}

}
