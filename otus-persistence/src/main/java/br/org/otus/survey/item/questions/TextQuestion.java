package br.org.otus.survey.item.questions;

import javax.persistence.Embeddable;

@Embeddable
public class TextQuestion extends Question {

	public TextQuestion(String templateID, String customID) {
		super(templateID, customID);
		super.objectType = "TextQuestion";
		super.dataType = "String";
	}

}
