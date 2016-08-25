package br.org.otus.survey.dtos.identity;

import java.util.List;

import br.org.otus.rest.dtos.Dto;

public class IdentityDto implements Dto {

	public String extents;

	public String objectType;

	public String name;

	public String acronym;

	public String recommendedTo;

	public String description;

	public List<String> keywords;

	@Override
	public Boolean isValid() {
		boolean flag = true;

		if (name.isEmpty() || acronym.isEmpty()) {
			flag = false;
		}

		return Boolean.valueOf(flag);
	}

}
