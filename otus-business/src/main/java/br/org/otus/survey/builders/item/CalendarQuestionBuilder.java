package br.org.otus.survey.builders.item;

import br.org.otus.survey.dtos.item.SurveyItemDto;
import br.org.otus.survey.dtos.item.questions.CalendarQuestionDto;
import br.org.otus.survey.item.SurveyItem;
import br.org.otus.survey.item.questions.CalendarQuestion;

public class CalendarQuestionBuilder implements SurveyItemBuilder {
	
	public SurveyItem convertFromDto(SurveyItemDto dto) {
		CalendarQuestionDto calendarQuestionDto = (CalendarQuestionDto) dto;
		CalendarQuestion calendarQuestion = new CalendarQuestion(calendarQuestionDto.templateID, calendarQuestionDto.customID);
		calendarQuestion.setFillingRules(null);
		calendarQuestion.setLabel(null);
		calendarQuestion.setMetadata(null);
		
		return calendarQuestion;
	}
	
}
