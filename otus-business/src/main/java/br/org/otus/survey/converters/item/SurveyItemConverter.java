package br.org.otus.survey.converters.item;

import br.org.otus.survey.dtos.item.SurveyItemDto;
import br.org.otus.survey.item.SurveyItem;

public interface SurveyItemConverter<DTO extends SurveyItemDto, ENT extends SurveyItem> {

	ENT convertFromDto(DTO dto);

}
