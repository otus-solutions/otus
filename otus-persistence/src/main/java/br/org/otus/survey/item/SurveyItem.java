package br.org.otus.survey.item;

import java.util.List;

import javax.persistence.Entity;

import br.org.otus.survey.item.choiceOptions.ChoiceOptions;
import br.org.otus.survey.item.fillingRules.FillingRules;
import br.org.otus.survey.item.metadata.MetadataGroup;
import br.org.otus.survey.item.unit.Unit;
import br.org.otus.survey.label.Label;
import br.org.tutty.Equalization;

@Entity
public class SurveyItem {
	
	/* Common attributes between all Items */
	@Equalization(name = "extents")
	private String extents;

	@Equalization(name = "objectType")
	private String objectType;

	@Equalization(name = "templateID")
	private String templateID;

	@Equalization(name = "customID")
	private String customID;
	
	@Equalization(name = "dataType")
	private String dataType;
	
	/* Common attributes between all Questions */
	@Equalization(name = "label")
	private Label label;
	
	@Equalization(name = "metadata")
	private MetadataGroup metadata;

	@Equalization(name = "fillingRules")
	private FillingRules fillingRules;
	
	/* Common attributes between all Numeric Questions - Integer & Decimal */
	@Equalization(name = "unit")
	private Unit unit;

	/* Common attributes between all Choice Questions - SingleSelection & Checkbox */
	@Equalization(name = "options")
	private List<ChoiceOptions> options;

	/* Attribute used only by Text Item */
	@Equalization(name = "value")
	private Label value;
	
	/* Attributes used only by Image Item */
	@Equalization(name = "url")
	private String url;

	@Equalization(name = "footer")
	private Label footer;

}
