package br.org.otus.survey.item.questions;

public class TextQuestion extends Question {

	public TextQuestion(String templateID, String customID) {
		super(templateID, customID);
		super.objectType = "TextQuestion";
		super.dataType = "String";
	}

}
