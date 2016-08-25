package br.org.otus.survey.dtos.item.label.locale;

import com.google.gson.annotations.SerializedName;

import br.org.otus.rest.dtos.Dto;
import br.org.tutty.Equalization;

public abstract class GenericLabelDto implements Dto {
	
	@SerializedName("extends")
	@Equalization(name = "extends")
	public String extents;
	
	@Equalization(name = "objectType")
	public String objectType;
	
	@Equalization(name = "oid")
	public String oid;
	
	@Equalization(name = "plainText")
	public String plainText;
	
	@Equalization(name = "formattedText")
	public String formattedText;

}
