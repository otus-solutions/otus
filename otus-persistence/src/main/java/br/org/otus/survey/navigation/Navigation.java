package br.org.otus.survey.navigation;

import java.util.List;

import javax.persistence.Entity;

import br.org.tutty.Equalization;

@Entity
public class Navigation {
	
	@Equalization(name = "extents")
	private String extents;

	@Equalization(name = "objectType")
	private String objectType;
	
	@Equalization(name = "origin")
	private String origin;

	@Equalization(name = "routes")
	private List<Route> routes;

}
