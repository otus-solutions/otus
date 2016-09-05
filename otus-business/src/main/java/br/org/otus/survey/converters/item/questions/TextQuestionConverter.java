package br.org.otus.survey.converters.item.questions;

import br.org.otus.survey.converters.item.QuestionConverter;
import br.org.otus.survey.converters.item.SurveyItemConverter;
import br.org.otus.survey.dtos.item.questions.TextQuestionDto;
import br.org.otus.survey.item.questions.TextQuestion;

public class TextQuestionConverter extends QuestionConverter
		implements SurveyItemConverter<TextQuestionDto, TextQuestion> {

	@Override
	public TextQuestion convertFromDto(TextQuestionDto dto) {
		TextQuestion textQuestion = new TextQuestion(dto.templateID, dto.customID);
		fillQuestionProperties(textQuestion, dto);
	
		return textQuestion;
	}

}
