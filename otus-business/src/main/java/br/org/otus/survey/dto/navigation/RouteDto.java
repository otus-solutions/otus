package br.org.otus.survey.dto.navigation;

import br.org.otus.rest.dtos.Dto;
import br.org.tutty.Equalization;

public class RouteDto implements Dto {
	
	@Equalization(name = "extents")
	public String extents;

	@Equalization(name = "objectType")
	public String objectType;
	
	@Equalization(name = "name")
	public String name;

	@Equalization(name = "origin")
	public String origin;

	@Equalization(name = "destination")
	public String destination;

	@Equalization(name = "conditionSet")
	public RouteConditionSetDto conditionSet;

	@Override
	public Boolean isValid() {
		return true;
	}

}
