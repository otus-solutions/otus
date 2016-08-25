package br.org.otus.survey.dtos.item.questions.numeric;

import br.org.otus.survey.dtos.item.questions.QuestionDto;
import br.org.otus.survey.dtos.item.questions.numeric.unit.UnitDto;

public class NumericQuestionDto extends QuestionDto {

	public UnitDto unit;
	
	@Override
	public Boolean isValid() {
		return super.isValid();
	}
	
}
