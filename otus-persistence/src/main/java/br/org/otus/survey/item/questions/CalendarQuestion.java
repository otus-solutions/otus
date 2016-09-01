package br.org.otus.survey.item.questions;

import javax.persistence.Embeddable;

@Embeddable
public class CalendarQuestion extends Question {

	private static final String CALENDAR_QUESTION = "CalendarQuestion";
	
	public CalendarQuestion(String templateID, String customID) {
		super(templateID, customID);
		super.objectType = CALENDAR_QUESTION;
		super.dataType = "LocalDate";
	}

	@Override
	public String toString() {
		return "CalendarQuestion [extents=" + super.extents + ", objectType=" + super.objectType + ", dataType=" + dataType
				+ ", getLabel()=" + getLabel() + ", getMetadata()=" + getMetadata() + ", getFillingRules()="
				+ getFillingRules() + ", getObjectType()=" + getObjectType() + ", getExtents()=" + getExtents()
				+ ", getTemplateID()=" + getTemplateID() + ", getCustomID()=" + getCustomID() + ", getDataType()="
				+ getDataType() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}
	
}
