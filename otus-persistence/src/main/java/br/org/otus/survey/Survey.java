package br.org.otus.survey;

import java.util.ArrayList;
import java.util.List;

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

	@NotNull
	private String objectType;

	@Id
	@NotNull
	private String oid;

	@NotNull
	public Identity identity;

	@NotNull
	private MetaInfo metaInfo;

	private List<SurveyItem> itemContainer;

	private List<Navigation> navigationList;
	
	public Survey() {
		itemContainer = new ArrayList<SurveyItem>();
		navigationList = new ArrayList<Navigation>();
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

	public void setItemContainer(List<SurveyItem> itemContainer) {
		this.itemContainer = itemContainer;
	}

	public List<Navigation> getNavigationList() {
		return navigationList;
	}

	public void setNavigationList(List<Navigation> navigationList) {
		this.navigationList = navigationList;
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
				+ identity.toString() + ", metaInfo=" + metaInfo.toString() + ", itemContainer=" + itemContainer
				+ ", navigationList=" + navigationList + "]";
	}

}
