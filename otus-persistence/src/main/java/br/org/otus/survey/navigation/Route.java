package br.org.otus.survey.navigation;

import javax.persistence.Embeddable;
import javax.persistence.Transient;

@Embeddable
public class Route {
	
	private String extents;
	private String objectType;
	private String name;
	private String origin;
	private String destination;
	@Transient
	private RouteConditionSet conditionSet;
	
	protected Route() {
		extents = "StudioObject";
		objectType ="Route";
		//conditionSet = new RouteConditionSet();
	}
	
	public Route(String origin, String destination, String name) {
		this();
		this.origin = origin;
		this.destination = destination;
		this.name = name;
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
