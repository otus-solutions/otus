package br.org.otus.survey.converters.item.questions;

import br.org.otus.survey.converters.item.QuestionConverter;
import br.org.otus.survey.converters.item.SurveyItemConverter;
import br.org.otus.survey.dtos.item.questions.PhoneQuestionDto;
import br.org.otus.survey.item.questions.PhoneQuestion;

public class PhoneQuestionConverter extends QuestionConverter
		implements SurveyItemConverter<PhoneQuestionDto, PhoneQuestion> {

	@Override
	public PhoneQuestion convertFromDto(PhoneQuestionDto dto) {
		PhoneQuestion phoneQuestion = new PhoneQuestion(dto.templateID, dto.customID);
		fillQuestionProperties(phoneQuestion, dto);
		
		return phoneQuestion;
	}

}
