package br.org.otus.survey.item.label.locale;

import javax.persistence.Embeddable;

@Embeddable
public class PtBR extends GenericLabel {

	public PtBR(String oid, String plainText, String formattedText) {
		super(oid, plainText, formattedText);
	}

}
