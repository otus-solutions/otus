package br.org.otus.survey.builders.item;

import br.org.otus.survey.dtos.item.SurveyItemDto;
import br.org.otus.survey.item.SurveyItem;

public interface SurveyItemBuilder {
	
	SurveyItem convertFromDto(SurveyItemDto dto);

}
