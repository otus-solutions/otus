package br.org.otus.survey.item.questions.metadata;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Embedded;

public class MetadataGroup {
	
	private String extents;
	private String objectType;
	@Embedded
	@ElementCollection
    private Set<MetadataOption> options;
    
    public MetadataGroup() {
    	extents = "StudioObject";
    	objectType = "MetadataGroup";
    	options = new HashSet<MetadataOption>();
	}

	public String getExtents() {
		return extents;
	}

	public String getObjectType() {
		return objectType;
	}

	public Set<MetadataOption> getOptions() {
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
