package br.org.otus.survey.navigation;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Embeddable;
import javax.persistence.Transient;

@Embeddable
public class Navigation {

	private String extents;
	private String objectType;
	private String origin;
	@Transient
	private List<Route> routes;

	protected Navigation() {
		extents = "StudioObject";
		objectType = "Navigation";
		routes = new ArrayList<Route>();
	}

	public Navigation(String origin) {
		this();
		this.origin = origin;
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

	public List<Route> getRoutes() {
		return routes;
	}

	public void addRoute(Route route) {
		routes.add(route);
	}

}
