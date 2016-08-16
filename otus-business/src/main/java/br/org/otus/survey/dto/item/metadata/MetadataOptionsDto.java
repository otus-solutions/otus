package br.org.otus.survey.dto.item.metadata;

import br.org.otus.survey.dto.label.LabelDto;
import br.org.tutty.Equalization;

public class MetadataOptionsDto {

	@Equalization(name = "extents")
	public String extents;

	@Equalization(name = "objectType")
	public String objectType;

	@Equalization(name = "dataType")
	public String dataType;

	@Equalization(name = "value")
	public String value;
	
	@Equalization(name = "label")
	public LabelDto label;
	
}
