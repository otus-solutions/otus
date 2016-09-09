package br.org.otus.survey.item.label.locale;

import javax.persistence.Embeddable;

@Embeddable
public class EsES extends GenericLabel {

	public EsES(String oid, String plainText, String formattedText) {
		super(oid, plainText, formattedText);
	}

}
