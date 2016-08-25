package br.org.otus.survey.dtos.item.miscellaneous;

import br.org.otus.survey.dtos.item.SurveyItemDto;
import br.org.otus.survey.dtos.item.label.LabelDto;

public class TextItemDto extends SurveyItemDto {

	public LabelDto value;
	
	@Override
	public Boolean isValid() {
		return super.isValid();
	}
		
}
