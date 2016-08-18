package br.org.otus.survey.label;

import br.org.tutty.Equalization;

public abstract class GenericLabel {
	
	@Equalization(name = "extends")
	private String extents;
	
	@Equalization(name = "objectType")
	private String objectType;
	
	@Equalization(name = "oid")
	private String oid;
	
	@Equalization(name = "plainText")
	private String plainText;
	
	@Equalization(name = "formattedText")
	private String formattedText;

}
