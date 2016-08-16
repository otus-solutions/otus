package br.org.otus.survey.dto;

import java.util.List;

import com.google.gson.annotations.SerializedName;

import br.org.otus.rest.dtos.Dto;
import br.org.otus.survey.dto.identity.IdentityDto;
import br.org.otus.survey.dto.item.SurveyItemDto;
import br.org.otus.survey.dto.metainfo.MetaInfoDto;
import br.org.otus.survey.dto.navigation.NavigationDto;
import br.org.tutty.Equalization;

public class SurveyDto implements Dto {

	@Equalization(name = "extents")
	public String extents;
	
	@Equalization(name = "objectType")
	public String objectType;
	
	@Equalization(name = "oid")
	public String oid;
	
	@Equalization(name = "identity")
	public IdentityDto identity;
	
	@SerializedName("metainfo")
	@Equalization(name = "metainfo")
	public MetaInfoDto metaInfo;
	
	@Equalization(name = "itemContainer")
	public List<SurveyItemDto> itemContainer;

	@Equalization(name = "navigationList")
	public List<NavigationDto> navigationList;

	@Override
	public Boolean isValid() {
		return true;
	}

}
