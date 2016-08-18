package br.org.otus.survey.identity;

import java.util.List;

import br.org.tutty.Equalization;

public class Identity {
	
	@Equalization(name = "extents")
	private String extents;

	@Equalization(name = "objectType")
	private String objectType;

	@Equalization(name = "name")
	private String name;

	@Equalization(name = "acronym")
	private String acronym;

	@Equalization(name = "recommendedTo")
	private String recommendedTo;

	@Equalization(name = "description")
	private String description;

	@Equalization(name = "keywords")
	private List<String> keywords;

}
