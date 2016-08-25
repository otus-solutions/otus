package br.org.otus.survey.dtos.item.questions.selectable;

import java.util.List;

import br.org.otus.survey.dtos.item.questions.QuestionDto;
import br.org.otus.survey.dtos.item.questions.selectable.options.RadioOptionDto;

public class SingleSelectionQuestionDto extends QuestionDto {
	
	public List<RadioOptionDto> options;
	
	@Override
	public Boolean isValid() {
		return super.isValid();
	}

}
