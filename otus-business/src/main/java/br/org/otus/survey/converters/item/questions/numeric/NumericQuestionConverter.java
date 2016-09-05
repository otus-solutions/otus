package br.org.otus.survey.converters.item.questions.numeric;

import br.org.otus.survey.converters.item.QuestionConverter;
import br.org.otus.survey.converters.item.questions.numeric.unit.UnitConverter;
import br.org.otus.survey.dtos.item.questions.numeric.NumericQuestionDto;
import br.org.otus.survey.item.questions.numeric.NumericQuestion;

public abstract class NumericQuestionConverter extends QuestionConverter {

	private UnitConverter unitConverter;
	
	public NumericQuestionConverter() {
		unitConverter = new UnitConverter();
	}
	
	protected void fillQuestionProperties(NumericQuestion question, NumericQuestionDto dto) {
		super.fillQuestionProperties(question, dto);
		question.setUnit(unitConverter.convertFromDto(dto.unit));
	}
}
