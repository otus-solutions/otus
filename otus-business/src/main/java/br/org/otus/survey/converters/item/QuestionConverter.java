package br.org.otus.survey.converters.item;

import br.org.otus.survey.converters.label.LabelConverter;
import br.org.otus.survey.converters.metadata.MetadataGroupBuilder;
import br.org.otus.survey.dtos.item.questions.QuestionDto;
import br.org.otus.survey.item.questions.Question;

public abstract class QuestionConverter {

	private LabelConverter labelConverter;
	private MetadataGroupBuilder metadataGroupBuilder;
	
	public QuestionConverter() {
		labelConverter = new LabelConverter();
		metadataGroupBuilder = new MetadataGroupBuilder();
	}
	
	protected void fillQuestionProperties(Question question, QuestionDto dto) {
		question.setLabel(labelConverter.convertFromDto(dto.label));
		question.setMetadata(metadataGroupBuilder.buildFromDto(dto.metadata).build());
		question.setFillingRules(null);
	}

}
