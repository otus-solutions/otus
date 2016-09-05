package br.org.otus.survey.converters.item.questions.numeric;

import br.org.otus.survey.converters.item.SurveyItemConverter;
import br.org.otus.survey.dtos.item.questions.numeric.IntegerQuestionDto;
import br.org.otus.survey.item.questions.numeric.IntegerQuestion;

public class IntegerQuestionConverter extends NumericQuestionConverter
		implements SurveyItemConverter<IntegerQuestionDto, IntegerQuestion> {

	@Override
	public IntegerQuestion convertFromDto(IntegerQuestionDto dto) {
		IntegerQuestion integerQuestion = new IntegerQuestion(dto.templateID, dto.customID);
		fillQuestionProperties(integerQuestion, dto);
		
		return integerQuestion;
	}

}
