package br.org.otus.survey.item;

import javax.persistence.Embeddable;

@Embeddable
public abstract class SurveyItem {
	
	protected String extents;
	private String templateID;
	private String customID;
	protected String objectType;
	protected String dataType;
	
	public SurveyItem(String templateID, String customID) {
		this.templateID = templateID;
		this.customID = customID;
	}
	
	public String getObjectType() {
		return objectType;
	}

	public String getExtents() {
		return extents;
	}

	public String getTemplateID() {
		return templateID;
	}

	public String getCustomID() {
		return customID;
	}

	public String getDataType() {
		return dataType;
	}

}
