package br.org.otus.survey.converters.item.questions;

import br.org.otus.survey.converters.item.QuestionConverter;
import br.org.otus.survey.converters.item.SurveyItemConverter;
import br.org.otus.survey.dtos.item.questions.CalendarQuestionDto;
import br.org.otus.survey.item.questions.CalendarQuestion;

public class CalendarQuestionConverter extends QuestionConverter
		implements SurveyItemConverter<CalendarQuestionDto, CalendarQuestion> {

	@Override
	public CalendarQuestion convertFromDto(CalendarQuestionDto dto) {
		CalendarQuestion calendarQuestion = new CalendarQuestion(dto.templateID, dto.customID);
		fillQuestionProperties(calendarQuestion, dto);
		return calendarQuestion;
	}

}
