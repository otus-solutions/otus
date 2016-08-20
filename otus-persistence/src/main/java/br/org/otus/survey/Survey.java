package br.org.otus.survey;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import br.org.otus.survey.identity.Identity;
import br.org.otus.survey.item.SurveyItem;
import br.org.otus.survey.metainfo.MetaInfo;
import br.org.otus.survey.navigation.Navigation;
import br.org.tutty.Equalization;

@Entity
public class Survey {

	@Equalization(name = "extents")
	private String extents;

	@Equalization(name = "objectType")
	@NotNull
	private String objectType;

	@Id
	@NotNull
	@Equalization(name = "oid")
	private String oid;

	@Equalization(name = "identity")
	@NotNull
	public Identity identity;

	@Equalization(name = "metainfo")
	@NotNull
	private MetaInfo metaInfo;

	@Equalization(name = "itemContainer")
	@NotNull
	private List<SurveyItem> itemContainer;

	@Equalization(name = "navigationList")
	@NotNull
	private List<Navigation> navigationList;

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
				+ identity + ", metaInfo=" + metaInfo + ", itemContainer=" + itemContainer
				+ ", navigationList=" + navigationList + "]";
	}

}
