package br.org.otus.survey.item.questions;

import br.org.otus.survey.item.SurveyItem;
import br.org.otus.survey.item.label.Label;
import br.org.otus.survey.item.questions.fillingRules.FillingRules;
import br.org.otus.survey.item.questions.metadata.MetadataGroup;

public abstract class Question extends SurveyItem {

	private Label label;
	private MetadataGroup metadata;
	private FillingRules fillingRules;
	
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
	
}
