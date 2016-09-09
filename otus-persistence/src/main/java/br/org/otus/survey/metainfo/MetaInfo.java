package br.org.otus.survey.metainfo;

import javax.persistence.Embeddable;

@Embeddable
public class MetaInfo {

	private String extents;
	private String objectType;
	private String creationDatetime;
	private String otusStudioVersion;
	
	protected MetaInfo() {
	}

	public MetaInfo(String creationDatetime) {
		this.creationDatetime = creationDatetime;
		extents = "StudioObject";
		objectType = "SurveyMetaInfo";
	}

	public String getExtents() {
		return extents;
	}

	public String getObjectType() {
		return objectType;
	}

	public String getCreationDatetime() {
		return creationDatetime;
	}

	public String getOtusStudioVersion() {
		return otusStudioVersion;
	}
	
	public void setOtusStudioVersion(String otusStudioVersion) {
		this.otusStudioVersion = otusStudioVersion;
	}

	@Override
	public String toString() {
		return "MetaInfo [extents=" + extents + ", objectType=" + objectType + ", creationDatetime=" + creationDatetime
				+ ", otusStudioVersion=" + otusStudioVersion + "]";
	}

}
