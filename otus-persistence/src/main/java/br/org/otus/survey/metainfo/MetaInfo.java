package br.org.otus.survey.metainfo;

import javax.persistence.Entity;

import br.org.tutty.Equalization;

@Entity
public class MetaInfo {
	
	@Equalization(name = "extents")
	private String extents;

	@Equalization(name = "objectType")
	private String objectType;
	
	@Equalization(name = "creationDatetime")
	private String creationDatetime;

	@Equalization(name = "otusStudioVersion")
	private String otusStudioVersion;

}
