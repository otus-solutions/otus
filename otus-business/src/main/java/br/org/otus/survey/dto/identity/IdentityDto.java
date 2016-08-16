package br.org.otus.survey.dto.identity;

import java.util.List;

import br.org.otus.rest.dtos.Dto;
import br.org.tutty.Equalization;

public class IdentityDto implements Dto {

	@Equalization(name = "extents")
	public String extents;

	@Equalization(name = "objectType")
	public String objectType;

	@Equalization(name = "name")
	public String name;

	@Equalization(name = "acronym")
	public String acronym;

	@Equalization(name = "recommendedTo")
	public String recommendedTo;

	@Equalization(name = "description")
	public String description;

	@Equalization(name = "keywords")
	public List<String> keywords;

	@Override
	public Boolean isValid() {
		return true;
	}

}
