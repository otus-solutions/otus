package br.org.otus.survey;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import br.org.otus.survey.identity.Identity;
import br.org.otus.survey.item.SurveyItem;
import br.org.otus.survey.metainfo.MetaInfo;
import br.org.otus.survey.navigation.Navigation;

@Entity
public class Survey {

	private String extents;
	
	private String objectType;
	
	@Id
	@NotNull
	private String oid;

	@NotNull
	@Embedded
	public Identity identity;

	@NotNull
	@Embedded
	private MetaInfo metaInfo;

	@Embedded
	@ElementCollection
	private Set<SurveyItem> itemContainer;

	@Embedded
	@ElementCollection
	private Set<Navigation> navigationList;

	protected Survey() {
	}

	public Survey(String oid) {
		this.oid = oid;
		extents = "StudioObject";
		objectType = "SurveyIdentity";
		itemContainer = new HashSet<SurveyItem>();
		navigationList = new HashSet<Navigation>();
	}

	public Identity getIdentity() {
		return identity;
	}

	public void setIdentity(Identity identity) {
		this.identity = identity;
	}

	public MetaInfo getMetaInfo() {
		return metaInfo;
	}

	public void setMetaInfo(MetaInfo metaInfo) {
		this.metaInfo = metaInfo;
	}

	public Set<SurveyItem> getItemContainer() {
		return itemContainer;
	}
	
	public void addSurveyItem(SurveyItem surveyItem) {
		itemContainer.add(surveyItem);
	}

	public Set<Navigation> getNavigationList() {
		return navigationList;
	}
	
	public void addNavigation(Navigation navigation) {
		navigationList.add(navigation);
	}

	public String getExtents() {
		return extents;
	}

	public String getObjectType() {
		return objectType;
	}

	public String getOid() {
		return oid;
	}

	@Override
	public String toString() {
		return "Survey [extents=" + extents + ", objectType=" + objectType + ", oid=" + oid + ", identity="
				+ identity.toString() + ", metaInfo=" + metaInfo.toString() + ", itemContainer=" + itemContainer.toString()
				+ ", navigationList=" + navigationList + "]";
	}
	
}
