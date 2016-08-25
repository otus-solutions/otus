package br.org.otus.survey.dtos.item.questions;

import br.org.otus.survey.dtos.item.SurveyItemDto;
import br.org.otus.survey.dtos.item.label.LabelDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.FillingRulesDto;
import br.org.otus.survey.dtos.item.questions.metadata.MetadataGroupDto;

public class QuestionDto extends SurveyItemDto {
	
	public LabelDto label;
	
	public MetadataGroupDto metadata;

	public FillingRulesDto fillingRules;
	
	@Override
	public Boolean isValid() {
		return super.isValid();
	}

}
