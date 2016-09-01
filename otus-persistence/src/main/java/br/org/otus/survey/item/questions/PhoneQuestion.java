package br.org.otus.survey.item.questions;

public class PhoneQuestion extends Question {

	public PhoneQuestion(String templateID, String customID) {
		super(templateID, customID);
		super.objectType = "PhoneQuestion";
		super.dataType = "Integer";
	}

}
