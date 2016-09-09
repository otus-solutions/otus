package br.org.otus.survey.identity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;

@Embeddable
public class Identity {

	private String extents;
	private String objectType;
	private String name;
	private String acronym;
	private String recommendedTo;
	private String description;
	@ElementCollection
	private List<String> keywords;
	
	protected Identity() {
		extents = "StudioObject";
		objectType = "SurveyIdentity";
		keywords = new ArrayList<String>();
	}

	public Identity(String name, String acronym) {
		this();
		this.name = name;
		this.acronym = acronym;
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

	public String getAcronym() {
		return acronym;
	}

	public String getRecommendedTo() {
		return recommendedTo;
	}

	public String getDescription() {
		return description;
	}

	public List<String> getKeywords() {
		return keywords;
	}

	public void setRecommendedTo(String recommendedTo) {
		this.recommendedTo = recommendedTo;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void addKeyWord(String keyword) {
		keywords.add(keyword);
	}

	@Override
	public String toString() {
		return "Identity [extents=" + extents + ", objectType=" + objectType + ", name=" + name + ", acronym=" + acronym
				+ ", recommendedTo=" + recommendedTo + ", description=" + description + ", keywords=" + keywords.toString() + "]";
	}

}
