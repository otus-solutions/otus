package br.org.otus.survey.dto.item.choiceOptions;

import br.org.otus.rest.dtos.Dto;
import br.org.otus.survey.dto.label.LabelDto;
import br.org.tutty.Equalization;

public class ChoiceOptionsDto implements Dto {
	
	@Equalization(name = "extents")
	public String extents;

	@Equalization(name = "objectType")
	public String objectType;

	@Equalization(name = "dataType")
	public String dataType;

	@Equalization(name = "label")
	public LabelDto label;
	
	@Equalization(name = "optionID")
	public String optionID;

	@Equalization(name = "customOptionID")
	public String customOptionID;

	@Equalization(name = "value")
	public Integer value;

	@Override
	public Boolean isValid() {
		return null;
	}

}
