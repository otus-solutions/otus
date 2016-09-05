package br.org.otus.survey.dtos.item;

import br.org.otus.rest.dtos.Dto;

public class SurveyItemDto implements Dto {
	
	public String extents;

	public String objectType;

	public String templateID;

	public String customID;
	
	public String dataType;

	@Override
	public Boolean isValid() {
		return (isValidIDs()) ? true : false;
	}
	
	private boolean isValidIDs() {
		boolean flag = true;
		
		if(templateID.isEmpty() || customID.isEmpty()) {
			flag = false;
		}
		
		return flag;
	}

}
