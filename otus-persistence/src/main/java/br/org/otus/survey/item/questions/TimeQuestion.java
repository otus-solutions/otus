package br.org.otus.survey.item.questions;

public class TimeQuestion extends Question {

	public TimeQuestion(String templateID, String customID) {
		super(templateID, customID);
		super.objectType = "TimeQuestion";
		super.dataType = "LocalTime";
	}

}
