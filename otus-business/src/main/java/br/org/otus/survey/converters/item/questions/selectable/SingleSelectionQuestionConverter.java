package br.org.otus.survey.converters.item.questions.selectable;

import br.org.otus.survey.converters.item.QuestionConverter;
import br.org.otus.survey.converters.item.SurveyItemConverter;
import br.org.otus.survey.converters.label.LabelConverter;
import br.org.otus.survey.dtos.item.questions.selectable.SingleSelectionQuestionDto;
import br.org.otus.survey.dtos.item.questions.selectable.options.RadioOptionDto;
import br.org.otus.survey.item.questions.selectable.SingleSelectionQuestion;
import br.org.otus.survey.item.questions.selectable.options.RadioOption;

public class SingleSelectionQuestionConverter extends QuestionConverter
		implements SurveyItemConverter<SingleSelectionQuestionDto, SingleSelectionQuestion> {

	@Override
	public SingleSelectionQuestion convertFromDto(SingleSelectionQuestionDto dto) {
		SingleSelectionQuestion singleSelectionQuestion = new SingleSelectionQuestion(dto.templateID, dto.customID);
		fillQuestionProperties(singleSelectionQuestion, dto);
		
		//TODO: Refactoring this loop
		for (RadioOptionDto radioOptionDto : dto.options) {
			RadioOption radioOption = new RadioOption(radioOptionDto.value);
			radioOption.setLabel(new LabelConverter().convertFromDto(radioOptionDto.label));
			singleSelectionQuestion.addOption(radioOption);
		}
		
		return singleSelectionQuestion;
	}

}
