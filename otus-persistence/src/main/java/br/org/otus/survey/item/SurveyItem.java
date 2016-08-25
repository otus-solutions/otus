package br.org.otus.survey.item;

public abstract class SurveyItem {
	
	private String extents;
	private String templateID;
	private String customID;
	protected String objectType;
	protected String dataType;
	
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
