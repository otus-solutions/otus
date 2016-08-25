package br.org.otus.survey.dtos.item.questions.selectable.options;

import br.org.otus.rest.dtos.Dto;
import br.org.otus.survey.dtos.item.label.LabelDto;

public class RadioOptionDto implements Dto {
	
	public String extents;

	public String objectType;

	public String dataType;

	public LabelDto label;
	
	public Integer value;

	@Override
	public Boolean isValid() {
		return null;
	}

}
