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
	private Identity identity;
	
	@Equalization(name = "metainfo")
	@NotNull
	private MetaInfo metaInfo;
	
	@Equalization(name = "itemContainer")
	@NotNull
	private List<SurveyItem> itemContainer;

	@Equalization(name = "navigationList")
	@NotNull
	private List<Navigation> navigationList;

}
