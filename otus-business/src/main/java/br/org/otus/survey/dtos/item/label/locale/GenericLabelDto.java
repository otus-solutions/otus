package br.org.otus.survey.dtos.item.label.locale;

import com.google.gson.annotations.SerializedName;

import br.org.otus.rest.dtos.Dto;

public abstract class GenericLabelDto implements Dto {
	
	@SerializedName("extends")
	public String extents;
	
	public String objectType;
	
	public String oid;
	
	public String plainText;
	
	public String formattedText;

}
