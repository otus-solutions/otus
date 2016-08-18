package br.org.otus.survey.navigation;

import javax.persistence.Entity;

import br.org.tutty.Equalization;

@Entity
public class Route {
	
	@Equalization(name = "extents")
	private String extents;

	@Equalization(name = "objectType")
	private String objectType;
	
	@Equalization(name = "name")
	private String name;

	@Equalization(name = "origin")
	private String origin;

	@Equalization(name = "destination")
	private String destination;

	@Equalization(name = "conditionSet")
	private RouteConditionSet conditionSet;

}
