package br.org.otus.survey.item.questions.selectable.options;

import br.org.otus.survey.item.label.Label;

public class RadioOption {
	
	private String extents;
	private String objectType;
	private String dataType;
	private Label label;
	private Integer value;
	
	public RadioOption(Integer value) {
		this.value = value;
		extents = "StudioObject";
		objectType = "AnswerOption";
		dataType = "Integer";
	}

	public String getExtents() {
		return extents;
	}

	public String getObjectType() {
		return objectType;
	}

	public String getDataType() {
		return dataType;
	}

	public Label getLabel() {
		return label;
	}

	public Integer getValue() {
		return value;
	}

	public void setLabel(Label label) {
		this.label = label;
	}

}
