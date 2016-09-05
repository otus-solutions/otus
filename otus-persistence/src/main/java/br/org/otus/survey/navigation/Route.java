package br.org.otus.survey.navigation;

import javax.persistence.Embeddable;
import javax.persistence.Embedded;

@Embeddable
public class Route {
	
	protected String extents;
	protected String objectType;
	private String name;
	private String origin;
	private String destination;
	@Embedded
	private RouteConditionSet conditionSet;
	
	public Route(String origin, String destination, String name) {
		this.origin = origin;
		this.destination = destination;
		this.name = name;
		extents = "StudioObject";
		objectType ="Route";
		conditionSet = new RouteConditionSet();
	}

	public String getExtents() {
		return extents;
	}

	public String getObjectType() {
		return objectType;
	}

	public String getName() {
		return name;
	}

	public String getOrigin() {
		return origin;
	}

	public String getDestination() {
		return destination;
	}

	public RouteConditionSet getConditionSet() {
		return conditionSet;
	}

	public void setConditionSet(RouteConditionSet conditionSet) {
		this.conditionSet = conditionSet;
	}

}
