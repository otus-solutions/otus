package br.org.otus.survey.dtos.item.questions.numeric;

public class IntegerQuestionDto extends NumericQuestionDto {
	
	@Override
	public Boolean isValid() {
		return true;
	}
}
