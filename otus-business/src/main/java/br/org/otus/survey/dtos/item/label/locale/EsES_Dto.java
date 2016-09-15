package br.org.otus.survey.dtos.item.label.locale;

import br.org.otus.exceptions.webservice.security.EncryptedException;

public class EsES_Dto extends GenericLabelDto {

	@Override
	public Boolean isValid() {
		return true;
	}

	@Override
	public void encrypt() throws EncryptedException {
	}

}
