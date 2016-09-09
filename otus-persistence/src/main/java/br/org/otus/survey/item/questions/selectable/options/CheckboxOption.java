package br.org.otus.survey.item.questions.selectable.options;

import javax.persistence.Embeddable;

import br.org.otus.survey.item.label.Label;

@Embeddable
public class CheckboxOption {

	private String extents;
	private String objectType;
	private String optionID;
	private String customOptionID;
	private String dataType;
	private Label label;

	public CheckboxOption(String optionID, String customOptionID) {
		this.optionID = optionID;
		this.customOptionID = customOptionID;
		extents = "StudioObject";
		objectType = "CheckboxAnswerOption";
		dataType = "Boolean";
	}

	public String getExtents() {
		return extents;
	}

	public String getObjectType() {
		return objectType;
	}

	public String getOptionID() {
		return optionID;
	}

	public String getCustomOptionID() {
		return customOptionID;
	}

	public String getDataType() {
		return dataType;
	}

	public Label getLabel() {
		return label;
	}

	public void setLabel(Label label) {
		this.label = label;
	}

}
