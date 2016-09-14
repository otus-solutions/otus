package br.org.otus.survey.dtos.item.questions.metadata;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.rest.dtos.Dto;
import br.org.otus.survey.dtos.item.label.LabelDto;

public class MetadataOptionDto implements Dto {

	public String extents;
	
	public String objectType;
	
	public String dataType;
	
	public String value;
	
	public LabelDto label;

	@Override
	public Boolean isValid() {
		return null;
	}

	@Override
	public void encrypt() throws EncryptedException {
	}
	
}
