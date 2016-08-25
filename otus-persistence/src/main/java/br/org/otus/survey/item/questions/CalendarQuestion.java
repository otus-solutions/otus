package br.org.otus.survey.item.questions;

import javax.persistence.Embeddable;

@Embeddable
public class CalendarQuestion extends Question {
	
	private static final String CALENDAR_QUESTION = "CalendarQuestion";
	
	public CalendarQuestion(String templateID, String customID) {
		super.objectType = CALENDAR_QUESTION;
		super.dataType = "LocalDate";
	}
	
}
