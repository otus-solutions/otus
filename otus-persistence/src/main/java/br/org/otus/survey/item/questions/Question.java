package br.org.otus.survey.item.questions;

import javax.persistence.Embeddable;
import javax.persistence.Embedded;

import br.org.otus.survey.item.SurveyItem;
import br.org.otus.survey.item.label.Label;
import br.org.otus.survey.item.questions.fillingRules.FillingRules;
import br.org.otus.survey.item.questions.metadata.MetadataGroup;

@Embeddable
public abstract class Question extends SurveyItem {

	@Embedded
	private Label label;
	@Embedded
	private MetadataGroup metadata;
	@Embedded
	private FillingRules fillingRules;
	
	public Question(String templateID, String customID) {
		super(templateID, customID);
	}
	
	public Label getLabel() {
		return label;
	}
	
	public void setLabel(Label label) {
		this.label = label;
	}
	
	public MetadataGroup getMetadata() {
		return metadata;
	}
	
	public void setMetadata(MetadataGroup metadata) {
		this.metadata = metadata;
	}
	
	public FillingRules getFillingRules() {
		return fillingRules;
	}
	
	public void setFillingRules(FillingRules fillingRules) {
		this.fillingRules = fillingRules;
	}

	@Override
	public String toString() {
		return "Question [label=" + label + ", metadata=" + metadata + ", fillingRules=" + fillingRules + "]";
	}
	
}
