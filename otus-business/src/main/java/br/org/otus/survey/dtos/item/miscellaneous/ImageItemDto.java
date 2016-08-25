package br.org.otus.survey.dtos.item.miscellaneous;

import br.org.otus.survey.dtos.item.SurveyItemDto;
import br.org.otus.survey.dtos.item.label.LabelDto;

public class ImageItemDto extends SurveyItemDto {

	public String url;

	public LabelDto footer;
	
	@Override
	public Boolean isValid() {
		return super.isValid();
	}

}
