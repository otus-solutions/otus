package br.org.otus.survey.item.label.locale;

import javax.persistence.Embeddable;

@Embeddable
public class EnUS extends GenericLabel {

	public EnUS(String oid, String plainText, String formattedText) {
		super(oid, plainText, formattedText);
	}

}
