package br.org.otus.survey.metainfo;

import br.org.tutty.Equalization;

public class MetaInfo {

	@Equalization(name = "extents")
	private String extents;

	@Equalization(name = "objectType")
	private String objectType;

	@Equalization(name = "creationDatetime")
	private String creationDatetime;

	@Equalization(name = "otusStudioVersion")
	private String otusStudioVersion;

	@Override
	public String toString() {
		return "MetaInfo [extents=" + extents + ", objectType=" + objectType + ", creationDatetime=" + creationDatetime
				+ ", otusStudioVersion=" + otusStudioVersion + "]";
	}

}
