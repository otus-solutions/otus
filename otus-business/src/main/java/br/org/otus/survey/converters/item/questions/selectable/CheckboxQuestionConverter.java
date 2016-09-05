package br.org.otus.survey.converters.item.questions.selectable;

import br.org.otus.survey.converters.item.QuestionConverter;
import br.org.otus.survey.converters.item.SurveyItemConverter;
import br.org.otus.survey.converters.label.LabelConverter;
import br.org.otus.survey.dtos.item.questions.selectable.CheckboxQuestionDto;
import br.org.otus.survey.dtos.item.questions.selectable.options.CheckboxOptionDto;
import br.org.otus.survey.item.questions.selectable.CheckboxQuestion;
import br.org.otus.survey.item.questions.selectable.options.CheckboxOption;

public class CheckboxQuestionConverter extends QuestionConverter
		implements SurveyItemConverter<CheckboxQuestionDto, CheckboxQuestion> {

	@Override
	public CheckboxQuestion convertFromDto(CheckboxQuestionDto dto) {
		CheckboxQuestion checkboxQuestion = new CheckboxQuestion(dto.templateID, dto.customID);
		fillQuestionProperties(checkboxQuestion, dto);
		
		//TODO: Refactoring this loop
		for (CheckboxOptionDto optionDto : dto.options) {
			CheckboxOption checkboxOption = new CheckboxOption(optionDto.optionID, optionDto.customOptionID);
			checkboxOption.setLabel(new LabelConverter().convertFromDto(optionDto.label));
			checkboxQuestion.addOption(checkboxOption);
		}
		
		return checkboxQuestion;
	}

}
