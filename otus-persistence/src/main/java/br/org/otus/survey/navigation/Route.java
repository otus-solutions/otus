package br.org.otus.survey.navigation;

public class Route {
	
	protected String extents;
	protected String objectType;
	private String name;
	private String origin;
	private String destination;
	private RouteConditionSet conditionSet;
	
	public Route(String origin, String destination) {
		this.origin = origin;
		this.destination = destination;
		extents = "StudioObject";
		objectType ="Route";
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

	public void setName(String name) {
		this.name = name;
	}

	public void setConditionSet(RouteConditionSet conditionSet) {
		this.conditionSet = conditionSet;
	}

}
