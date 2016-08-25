package br.org.otus.survey.item.label;

import br.org.otus.survey.item.label.locale.EnUS;
import br.org.otus.survey.item.label.locale.EsES;
import br.org.otus.survey.item.label.locale.PtBR;

public class Label {

	private PtBR ptBR;
	private EnUS enUS;
	private EsES esES;
	
	public PtBR getPtBR() {
		return ptBR;
	}

	public void setPtBR(PtBR ptBR) {
		this.ptBR = ptBR;
	}

	public EnUS getEnUS() {
		return enUS;
	}

	public void setEnUS(EnUS enUS) {
		this.enUS = enUS;
	}

	public EsES getEsES() {
		return esES;
	}

	public void setEsES(EsES esES) {
		this.esES = esES;
	}

	@Override
	public String toString() {
		return "Label [ptBR=" + ptBR.toString() + ", enUS=" + enUS.toString() + ", esES=" + esES.toString() + "]";
	}

}
