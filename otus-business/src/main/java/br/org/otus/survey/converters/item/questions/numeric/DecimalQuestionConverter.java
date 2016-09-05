package br.org.otus.survey.converters.item.questions.numeric;

import br.org.otus.survey.converters.item.SurveyItemConverter;
import br.org.otus.survey.dtos.item.questions.numeric.DecimalQuestionDto;
import br.org.otus.survey.item.questions.numeric.DecimalQuestion;

public class DecimalQuestionConverter extends NumericQuestionConverter
		implements SurveyItemConverter<DecimalQuestionDto, DecimalQuestion> {

	@Override
	public DecimalQuestion convertFromDto(DecimalQuestionDto dto) {
		DecimalQuestion decimalQuestion = new DecimalQuestion(dto.templateID, dto.customID);
		fillQuestionProperties(decimalQuestion, dto);

		return decimalQuestion;
	}

}
