package br.org.otus.survey.dtos.item.questions.selectable;

import java.util.List;

import br.org.otus.survey.dtos.item.questions.QuestionDto;
import br.org.otus.survey.dtos.item.questions.selectable.options.CheckboxOptionDto;

public class CheckboxQuestionDto extends QuestionDto {
	
	public List<CheckboxOptionDto> options;
	
	@Override
	public Boolean isValid() {
		return super.isValid();
	}

}
