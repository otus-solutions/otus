package br.org.otus.survey.item.questions;

import javax.persistence.Embeddable;

@Embeddable
public class EmailQuestion extends Question {

	public EmailQuestion(String templateID, String customID) {
		super(templateID, customID);
		super.objectType = "EmailQuestion";
		super.dataType = "String";
	}

}
