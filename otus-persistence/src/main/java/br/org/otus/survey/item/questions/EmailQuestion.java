package br.org.otus.survey.item.questions;

public class EmailQuestion extends Question {

	public EmailQuestion(String templateID, String customID) {
		super(templateID, customID);
		super.objectType = "EmailQuestion";
		super.dataType = "String";
	}

}
