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
		ptBR = new PtBR();

		ptBR.setExtents(ptBR_Dto.extents);
		ptBR.setFormattedText(ptBR_Dto.formattedText);
		ptBR.setObjectType(ptBR_Dto.objectType);
		ptBR.setOid(ptBR_Dto.oid);
		ptBR.setPlainText(ptBR_Dto.plainText);

		return ptBR;
	}

	private EsES buildEsES(EsES_Dto esES_Dto) {
		esES = new EsES();

		esES.setExtents(esES_Dto.extents);
		esES.setFormattedText(esES_Dto.formattedText);
		esES.setObjectType(esES_Dto.objectType);
		esES.setOid(esES_Dto.oid);
		esES.setPlainText(esES_Dto.plainText);

		return esES;
	}

	private EnUS buildEnUS(EnUS_Dto enUS_Dto) {
		enUS = new EnUS();

		enUS.setExtents(enUS_Dto.extents);
		enUS.setFormattedText(enUS_Dto.formattedText);
		enUS.setObjectType(enUS_Dto.objectType);
		enUS.setOid(enUS_Dto.oid);
		enUS.setPlainText(enUS_Dto.plainText);

		return enUS;
	}

}
