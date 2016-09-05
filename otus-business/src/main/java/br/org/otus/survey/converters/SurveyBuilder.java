package br.org.otus.survey.converters;

import java.util.List;

import br.org.otus.survey.Survey;
import br.org.otus.survey.converters.navigation.NavigationConverter;
import br.org.otus.survey.dtos.SurveyDto;
import br.org.otus.survey.dtos.identity.IdentityDto;
import br.org.otus.survey.dtos.item.SurveyItemDto;
import br.org.otus.survey.dtos.metainfo.MetaInfoDto;
import br.org.otus.survey.dtos.navigation.NavigationDto;
import br.org.otus.survey.enums.SurveyItemMapping;
import br.org.otus.survey.identity.Identity;
import br.org.otus.survey.item.SurveyItem;
import br.org.otus.survey.metainfo.MetaInfo;

public class SurveyBuilder {

	private Survey survey;
	
	public Survey build() {
		return this.survey;
	}
	
	public SurveyBuilder buildFromDto(SurveyDto dto) {
		survey = new Survey(dto.oid);
		survey.setIdentity(buildIdentityFromDto(dto.identity));
		survey.setMetaInfo(buildMetaInfoFromDto(dto.metainfo));
		buildItemContainerFromDto(dto.itemContainer);
		buildNavigationListFromDto(dto.navigationList);
		
		return this;
	}


	private Identity buildIdentityFromDto(IdentityDto dto) {
		Identity identity = new Identity(dto.name, dto.acronym);
		identity.setDescription(dto.description);
		identity.setRecommendedTo(dto.recommendedTo);
		
		return identity;
	}

	private MetaInfo buildMetaInfoFromDto(MetaInfoDto dto) {
		MetaInfo metainfo = new MetaInfo(dto.creationDatetime);
		metainfo.setOtusStudioVersion(dto.otusStudioVersion);
		
		return metainfo;
	}

	private void buildItemContainerFromDto(List<SurveyItemDto> surveyItemDtoList) {
		for (SurveyItemDto surveyItemDto : surveyItemDtoList) {
			survey.addSurveyItem(buildSurveyItem(surveyItemDto));
		}
	}

	@SuppressWarnings("unchecked")
	private SurveyItem buildSurveyItem(SurveyItemDto surveyItemDto) {
		return SurveyItemMapping.getEnumByObjectType(surveyItemDto.objectType).getConverter().convertFromDto(surveyItemDto);
	}
	
	private void buildNavigationListFromDto(List<NavigationDto> navigationList) {
		NavigationConverter navigationConverter = new NavigationConverter();
		
		for (NavigationDto navigationDto : navigationList) {
			survey.addNavigation(navigationConverter.convertFromDto(navigationDto));
		}
	}

}
