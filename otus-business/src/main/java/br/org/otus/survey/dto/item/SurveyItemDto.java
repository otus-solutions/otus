package br.org.otus.survey.dto.item;

import java.util.List;

import br.org.otus.rest.dtos.Dto;
import br.org.otus.survey.dto.item.choiceOptions.ChoiceOptionsDto;
import br.org.otus.survey.dto.item.fillingRules.FillingRulesDto;
import br.org.otus.survey.dto.item.metadata.MetadataGroupDto;
import br.org.otus.survey.dto.item.unit.UnitDto;
import br.org.otus.survey.dto.label.LabelDto;
import br.org.tutty.Equalization;

public class SurveyItemDto implements Dto {
	
	/* Common attributes between all Items */
	@Equalization(name = "extents")
	public String extents;

	@Equalization(name = "objectType")
	public String objectType;

	@Equalization(name = "templateID")
	public String templateID;

	@Equalization(name = "customID")
	public String customID;
	
	@Equalization(name = "dataType")
	public String dataType;
	
	/* Common attributes between all Questions */
	@Equalization(name = "label")
	public LabelDto label;
	
	@Equalization(name = "metadata")
	public MetadataGroupDto metadata;

	@Equalization(name = "fillingRules")
	public FillingRulesDto fillingRules;
	
	/* Common attributes between all Numeric Questions - Integer & Decimal */
	@Equalization(name = "unit")
	public UnitDto unit;

	/* Common attributes between all Choice Questions - SingleSelection & Checkbox */
	@Equalization(name = "options")
	public List<ChoiceOptionsDto> options;

	/* Attribute used only by Text Item */
	@Equalization(name = "value")
	public LabelDto value;
	
	/* Attributes used only by Image Item */
	@Equalization(name = "url")
	public String url;

	@Equalization(name = "footer")
	public LabelDto footer;

	@Override
	public Boolean isValid() {
		return true;
	}

}
