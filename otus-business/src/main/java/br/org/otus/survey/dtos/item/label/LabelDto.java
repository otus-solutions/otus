package br.org.otus.survey.dtos.item.label;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.rest.dtos.Dto;
import br.org.otus.survey.dtos.item.label.locale.EnUS_Dto;
import br.org.otus.survey.dtos.item.label.locale.EsES_Dto;
import br.org.otus.survey.dtos.item.label.locale.PtBR_Dto;

public class LabelDto implements Dto {
	
	public PtBR_Dto ptBR;
	public EnUS_Dto enUS;
	public EsES_Dto esES;

	@Override
	public Boolean isValid() {
		return true;
	}

	@Override
	public void encrypt() throws EncryptedException {
	}

}
