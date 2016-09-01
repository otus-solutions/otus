package br.org.otus.survey.builders.label;

import br.org.otus.survey.dtos.item.label.LabelDto;
import br.org.otus.survey.dtos.item.label.locale.EnUS_Dto;
import br.org.otus.survey.dtos.item.label.locale.EsES_Dto;
import br.org.otus.survey.dtos.item.label.locale.PtBR_Dto;
import br.org.otus.survey.item.label.Label;
import br.org.otus.survey.item.label.locale.EnUS;
import br.org.otus.survey.item.label.locale.EsES;
import br.org.otus.survey.item.label.locale.PtBR;

public class LabelBuilder {

	private Label label;

	private PtBR ptBR;
	private EsES esES;
	private EnUS enUS;

	public LabelBuilder() {
		label = new Label();
	}

	public Label build() {
		return this.label;
	}

	public LabelBuilder buildFromDto(LabelDto labelDto) {
		label.setPtBR(buildPtBR(labelDto.ptBR));
		label.setEsES(buildEsES(labelDto.esES));
		label.setEnUS(buildEnUS(labelDto.enUS));

		return this;
	}

	private PtBR buildPtBR(PtBR_Dto ptBR_Dto) {
		ptBR = new PtBR(ptBR_Dto.plainText, ptBR_Dto.formattedText);
		ptBR.setOid(ptBR_Dto.oid);

		return ptBR;
	}

	private EsES buildEsES(EsES_Dto esES_Dto) {
		esES = new EsES(esES_Dto.plainText, esES_Dto.formattedText);
		esES.setOid(esES_Dto.oid);

		return esES;
	}

	private EnUS buildEnUS(EnUS_Dto enUS_Dto) {
		enUS = new EnUS(enUS_Dto.plainText, enUS_Dto.formattedText);
		enUS.setOid(enUS_Dto.oid);

		return enUS;
	}

}
