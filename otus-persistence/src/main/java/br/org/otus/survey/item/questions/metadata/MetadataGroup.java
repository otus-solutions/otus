package br.org.otus.survey.item.questions.metadata;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;

@Embeddable
public class MetadataGroup {
	
	private String extents;
	private String objectType;
	@Embedded
	@ElementCollection
    private List<MetadataOption> options;
    
    public MetadataGroup() {
    	extents = "StudioObject";
    	objectType = "MetadataGroup";
    	options = new ArrayList<MetadataOption>();
	}

	public String getExtents() {
		return extents;
	}

	public String getObjectType() {
		return objectType;
	}

	public List<MetadataOption> getOptions() {
		return options;
	}

	public void addOption(MetadataOption option) {
		options.add(option);
	}
	
	@Override
	public String toString() {
		return "MetadataGroup [extents=" + extents + ", objectType=" + objectType + ", options=" + options + "]";
	}

}
