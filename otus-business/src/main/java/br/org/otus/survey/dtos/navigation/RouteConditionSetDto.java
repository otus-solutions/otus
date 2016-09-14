package br.org.otus.survey.dtos.navigation;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.rest.dtos.Dto;

public class RouteConditionSetDto implements Dto {

	@Override
	public Boolean isValid() {
		return true;
	}

	@Override
	public void encrypt() throws EncryptedException {
	}

}
