package br.org.otus.survey.builder;

import java.util.List;

import br.org.otus.survey.Survey;
import br.org.otus.survey.dto.identity.IdentityDto;
import br.org.otus.survey.dto.item.SurveyItemDto;
import br.org.otus.survey.dto.metainfo.MetaInfoDto;
import br.org.otus.survey.identity.Identity;
import br.org.otus.survey.label.Label;
import br.org.otus.survey.metainfo.MetaInfo;
import br.org.tutty.Equalizer;

public class SurveyBuilder {

	private Survey survey;

	public SurveyBuilder() {
		survey = new Survey();
	}

	public void fromJson() {
		//TODO 
	}

	public Survey build() {
		return this.survey;
	}

	public SurveyBuilder buildIdentity(IdentityDto dto) {
		Identity identity = new Identity();
		Equalizer.equalize(dto, identity);
		survey.setIdentity(identity);
		return this;
	}

	public SurveyBuilder buildMetaInfo(MetaInfoDto dto) {
		MetaInfo metainfo = new MetaInfo();
		Equalizer.equalize(dto, metainfo);
		survey.setMetaInfo(metainfo);
		return this;
	}

	public SurveyBuilder buildItemContainer(List<SurveyItemDto> surveyItemDtoList) {
		for (SurveyItemDto surveyItemDto : surveyItemDtoList) {
			buildSurveyItem(surveyItemDto);
		}
		
		return this;
	}

	private void buildSurveyItem(SurveyItemDto surveyItemDto) {
		Label label = new Label();
		
		
		
	}

}
