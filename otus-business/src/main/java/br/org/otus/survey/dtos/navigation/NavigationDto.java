package br.org.otus.survey.dtos.navigation;

import java.util.List;

import br.org.otus.rest.dtos.Dto;

public class NavigationDto implements Dto {
	
	public String extents;

	public String objectType;
	
	public String origin;

	public List<RouteDto> routes;
	
	@Override
	public Boolean isValid() {
		return true;
	}

}
