package br.org.otus.survey.item.questions.metadata;

import java.util.ArrayList;
import java.util.List;

public class MetadataGroup {
	
	private String extents;
	private String objectType;
    private List<MetadataOption> options;
    
    public MetadataGroup() {
    	options = new ArrayList<MetadataOption>();
	}

	public String getExtents() {
		return extents;
	}

	public void setExtents(String extents) {
		this.extents = extents;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	public List<MetadataOption> getOptions() {
		return options;
	}

	public void setOptions(List<MetadataOption> options) {
		this.options = options;
	}
	
	@Override
	public String toString() {
		return "MetadataGroup [extents=" + extents + ", objectType=" + objectType + ", options=" + options + "]";
	}

}
