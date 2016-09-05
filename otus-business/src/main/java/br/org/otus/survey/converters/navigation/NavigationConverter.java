package br.org.otus.survey.converters.navigation;

import br.org.otus.survey.dtos.navigation.NavigationDto;
import br.org.otus.survey.dtos.navigation.RouteDto;
import br.org.otus.survey.navigation.Navigation;
import br.org.otus.survey.navigation.Route;

public class NavigationConverter {

	public Navigation convertFromDto(NavigationDto dto) {
		Navigation navigation = new Navigation(dto.origin);
		for (RouteDto routeDto : dto.routes) {
			navigation.addRoute(new Route(routeDto.origin, routeDto.destination, routeDto.name));
		}
		
		return navigation;
	}
}
