package br.org.otus.survey.navigation;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;

@Embeddable
public class Navigation {

	private String extents;
	private String objectType;
	private String origin;
	@Embedded
	@ElementCollection
	private Set<Route> routes;

	public Navigation(String origin) {
		this.origin = origin;
		extents = "StudioObject";
		objectType = "Navigation";
		routes = new HashSet<Route>();
	}

	public String getExtents() {
		return extents;
	}

	public String getObjectType() {
		return objectType;
	}

	public String getOrigin() {
		return origin;
	}

	public Set<Route> getRoutes() {
		return routes;
	}

	public void addRoute(Route route) {
		routes.add(route);
	}

}
