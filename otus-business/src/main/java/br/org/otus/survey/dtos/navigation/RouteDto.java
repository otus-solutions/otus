package br.org.otus.survey.dtos.navigation;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.rest.dtos.Dto;

public class RouteDto implements Dto {
	
	public String extents;

	public String objectType;
	
	public String name;

	public String origin;

	public String destination;

	public RouteConditionSetDto conditionSet;

	@Override
	public Boolean isValid() {
		return true;
	}

	@Override
	public void encrypt() throws EncryptedException {
	}

}
