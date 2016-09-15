package br.org.otus.survey.dtos.item.questions.fillingRules.validators.generic;

import com.google.gson.annotations.SerializedName;

public abstract class GenericValidatorDto {
	
	@SerializedName("extends")
	public String extents;
	
	public String objectType;
	
	public String validatorType;
	
}
