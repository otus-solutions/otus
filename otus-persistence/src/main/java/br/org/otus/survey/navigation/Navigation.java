package br.org.otus.survey.navigation;

import java.util.ArrayList;
import java.util.List;

public class Navigation {

	private String extents;
	private String objectType;
	private String origin;
	private List<Route> routes;

	public Navigation(String origin) {
		extents = "StudioObject";
		objectType = "Navigation";
		this.origin = origin;
		routes = new ArrayList<Route>();
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
