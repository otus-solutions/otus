package br.org.otus.survey.converters.item.questions;

import br.org.otus.survey.converters.item.QuestionConverter;
import br.org.otus.survey.converters.item.SurveyItemConverter;
import br.org.otus.survey.dtos.item.questions.TimeQuestionDto;
import br.org.otus.survey.item.questions.TimeQuestion;

public class TimeQuestionConverter extends QuestionConverter
		implements SurveyItemConverter<TimeQuestionDto, TimeQuestion> {

	@Override
	public TimeQuestion convertFromDto(TimeQuestionDto dto) {
		TimeQuestion timeQuestion = new TimeQuestion(dto.templateID, dto.customID);
		fillQuestionProperties(timeQuestion, dto);
		
		return timeQuestion;
	}

}
