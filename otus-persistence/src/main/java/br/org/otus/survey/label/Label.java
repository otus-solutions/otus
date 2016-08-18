package br.org.otus.survey.label;

import javax.persistence.Entity;

import br.org.tutty.Equalization;

@Entity
public class Label {
	
	@Equalization(name = "ptBR")
	private PtBR ptBR;

	@Equalization(name = "enUS")
	private EnUS enUS;
	
	@Equalization(name = "esES")
	private EsES esES;

}
