package br.org.otus.survey.item.questions.metadata;

import br.org.otus.survey.item.label.Label;

public class MetadataOption {

	private String extents;
	private String objectType;
	private String dataType;
	private String value;
	private Label label;

	public String getExtents() {
		return extents;
	}

	public void setExtents(String extents) {
		this.extents = extents;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
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
