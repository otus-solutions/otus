package br.org.otus.survey.dto.navigation;

import java.util.List;

import br.org.otus.rest.dtos.Dto;
import br.org.tutty.Equalization;

public class NavigationDto implements Dto {
	
	@Equalization(name = "extents")
	public String extents;

	@Equalization(name = "objectType")
	public String objectType;
	
	@Equalization(name = "origin")
	public String origin;

	@Equalization(name = "routes")
	public List<RouteDto> routes;
	
	@Override
	public Boolean isValid() {
		return true;
	}

}
