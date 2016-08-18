package br.org.otus.survey.item.choiceOptions;

import javax.persistence.Entity;

import br.org.otus.survey.label.Label;
import br.org.tutty.Equalization;

@Entity
public class ChoiceOptions {
	
	@Equalization(name = "extents")
	private String extents;

	@Equalization(name = "objectType")
	private String objectType;

	@Equalization(name = "dataType")
	private String dataType;

	@Equalization(name = "label")
	private Label label;
	
	@Equalization(name = "optionID")
	private String optionID;

	@Equalization(name = "customOptionID")
	private String customOptionID;

	@Equalization(name = "value")
	private Integer value;

}
