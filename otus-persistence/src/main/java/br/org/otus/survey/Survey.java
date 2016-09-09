package br.org.otus.survey;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;

import br.org.otus.survey.identity.Identity;
import br.org.otus.survey.item.SurveyItem;
import br.org.otus.survey.metainfo.MetaInfo;
import br.org.otus.survey.navigation.Navigation;

@Entity
public class Survey {

	private String extents;
	private String objectType;
	
	@Id
	private String oid;

	@Embedded
	public Identity identity;

	@Embedded
	private MetaInfo metaInfo;

	@Embedded
	@ElementCollection
	private List<SurveyItem> itemContainer;
	
	@Embedded
	@ElementCollection
	private List<Navigation> navigationList;

	protected Survey() {
		extents = "StudioObject";
		objectType = "SurveyIdentity";
		itemContainer = new ArrayList<SurveyItem>();
		navigationList = new ArrayList<Navigation>();
	}

	public Survey(String oid) {
		this();
		this.oid = oid;
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

	public List<SurveyItem> getItemContainer() {
		return itemContainer;
	}
	
	public void addSurveyItem(SurveyItem surveyItem) {
		itemContainer.add(surveyItem);
	}

	public List<Navigation> getNavigationList() {
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
