package br.org.otus.survey.item.questions.metadata;

import br.org.otus.survey.item.label.Label;

public class MetadataOption {

	private String extents;
	private String objectType;
	private String dataType;
	private Integer value;
	private Label label;
	
	public MetadataOption(Integer value) {
		this.value = value;
		extents = "StudioObject";
		objectType = "MetadataAnswer";
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

	public Integer getValue() {
		return value;
	}

	public Label getLabel() {
		return label;
	}

	public void setLabel(Label label) {
		this.label = label;
	}

	@Override
	public String toString() {
		return "MetadataOptions [extents=" + extents + ", objectType=" + objectType + ", dataType=" + dataType
				+ ", value=" + value + ", label=" + label.toString() + "]";
	}

}
