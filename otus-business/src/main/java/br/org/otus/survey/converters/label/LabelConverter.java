package br.org.otus.survey.converters.label;

import br.org.otus.survey.dtos.item.label.LabelDto;
import br.org.otus.survey.dtos.item.label.locale.EnUS_Dto;
import br.org.otus.survey.dtos.item.label.locale.EsES_Dto;
import br.org.otus.survey.dtos.item.label.locale.PtBR_Dto;
import br.org.otus.survey.item.label.Label;
import br.org.otus.survey.item.label.locale.EnUS;
import br.org.otus.survey.item.label.locale.EsES;
import br.org.otus.survey.item.label.locale.PtBR;

public class LabelConverter {

	private Label label;

	public Label convertFromDto(LabelDto labelDto) {
		label = new Label();
		label.setPtBR(buildPtBR(labelDto.ptBR));
		label.setEsES(buildEsES(labelDto.esES));
		label.setEnUS(buildEnUS(labelDto.enUS));

		return label;
	}

	private PtBR buildPtBR(PtBR_Dto ptBR_Dto) {
		return new PtBR(ptBR_Dto.oid, ptBR_Dto.plainText, ptBR_Dto.formattedText);
	}

	private EsES buildEsES(EsES_Dto esES_Dto) {
		return new EsES(esES_Dto.oid, esES_Dto.plainText, esES_Dto.formattedText);
	}

	private EnUS buildEnUS(EnUS_Dto enUS_Dto) {
		return new EnUS(enUS_Dto.oid, enUS_Dto.plainText, enUS_Dto.formattedText);
	}

}
