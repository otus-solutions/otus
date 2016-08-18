package br.org.otus.survey.item.metadata;

import java.util.List;

import javax.persistence.Entity;

import br.org.tutty.Equalization;

@Entity
public class MetadataGroup {
	
	@Equalization(name = "extents")
	private String extents;

	@Equalization(name = "objectType")
	private String objectType;

	@Equalization(name = "options")
    private List<MetadataOptions> options;

}
