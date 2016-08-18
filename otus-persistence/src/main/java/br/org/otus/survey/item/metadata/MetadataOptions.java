package br.org.otus.survey.item.metadata;

import javax.persistence.Entity;

import br.org.otus.survey.label.Label;
import br.org.tutty.Equalization;

@Entity
public class MetadataOptions {
	
	@Equalization(name = "extents")
	private String extents;

	@Equalization(name = "objectType")
	private String objectType;

	@Equalization(name = "dataType")
	private String dataType;

	@Equalization(name = "value")
	private String value;
	
	@Equalization(name = "label")
	private Label label;

}
