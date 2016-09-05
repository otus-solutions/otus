package br.org.otus.survey.converters.item.questions;

import br.org.otus.survey.converters.item.QuestionConverter;
import br.org.otus.survey.converters.item.SurveyItemConverter;
import br.org.otus.survey.dtos.item.questions.EmailQuestionDto;
import br.org.otus.survey.item.questions.EmailQuestion;

public class EmailQuestionConverter extends QuestionConverter
		implements SurveyItemConverter<EmailQuestionDto, EmailQuestion> {

	@Override
	public EmailQuestion convertFromDto(EmailQuestionDto dto) {
		EmailQuestion emailQuestion = new EmailQuestion(dto.templateID, dto.customID);
		fillQuestionProperties(emailQuestion, dto);

		return emailQuestion;
	}

}
