package br.org.otus.survey.dtos.item.questions.fillingRules;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.rest.dtos.Dto;

public class FillingRulesDto implements Dto {

	@Override
	public Boolean isValid() {
		return null;
	}

	@Override
	public void encrypt() throws EncryptedException {
	}

}
