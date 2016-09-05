package br.org.otus.survey.converters.item.questions.numeric.unit;

import br.org.otus.survey.dtos.item.label.locale.EnUS_Dto;
import br.org.otus.survey.dtos.item.label.locale.EsES_Dto;
import br.org.otus.survey.dtos.item.label.locale.PtBR_Dto;
import br.org.otus.survey.dtos.item.questions.numeric.unit.UnitDto;
import br.org.otus.survey.item.label.locale.EnUS;
import br.org.otus.survey.item.label.locale.EsES;
import br.org.otus.survey.item.label.locale.PtBR;
import br.org.otus.survey.item.questions.numeric.unit.Unit;

public class UnitConverter {

	public Unit convertFromDto(UnitDto dto) {
		Unit unit = new Unit();
		unit.setPtBR(buildPtBR(dto.ptBR));
		unit.setEsES(buildEsES(dto.esES));
		unit.setEnUS(buildEnUS(dto.enUS));

		return unit;
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
