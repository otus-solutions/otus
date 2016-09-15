package br.org.otus.survey.dtos.item.questions.fillingRules;

import com.google.gson.annotations.SerializedName;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.rest.dtos.Dto;

public class FillingRulesDto implements Dto {
	
	@SerializedName("extends")
	public String extents;
	
	public String objectType;
	
	public OptionsDto options;
	

	@Override
	public Boolean isValid() {
		return true;
	}

	@Override
	public void encrypt() throws EncryptedException {
	}

}
