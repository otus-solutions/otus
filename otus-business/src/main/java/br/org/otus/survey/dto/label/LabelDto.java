package br.org.otus.survey.dto.label;

import br.org.otus.rest.dtos.Dto;
import br.org.tutty.Equalization;

public class LabelDto implements Dto {
	
	@Equalization(name = "ptBR")
	public PtBR_Dto ptBR;

	@Equalization(name = "enUS")
	public EnUS_Dto enUS;
	
	@Equalization(name = "esES")
	public EsES_Dto esES;

	@Override
	public Boolean isValid() {
		return true;
	}

}
