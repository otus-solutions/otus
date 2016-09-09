package br.org.otus.survey.item.questions;

import javax.persistence.Embeddable;

@Embeddable
public class PhoneQuestion extends Question {

	public PhoneQuestion(String templateID, String customID) {
		super(templateID, customID);
		super.objectType = "PhoneQuestion";
		super.dataType = "Integer";
	}

}
