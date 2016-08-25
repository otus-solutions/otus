package br.org.otus.survey.builders;

import java.util.List;

import br.org.otus.survey.Survey;
import br.org.otus.survey.builders.choiceOptions.ChoiceOptionBuilder;
import br.org.otus.survey.builders.label.LabelBuilder;
import br.org.otus.survey.builders.metadata.MetadataGroupBuilder;
import br.org.otus.survey.dtos.SurveyDto;
import br.org.otus.survey.dtos.identity.IdentityDto;
import br.org.otus.survey.dtos.item.SurveyItemDto;
import br.org.otus.survey.dtos.metainfo.MetaInfoDto;
import br.org.otus.survey.identity.Identity;
import br.org.otus.survey.item.SurveyItem;
import br.org.otus.survey.metainfo.MetaInfo;
import br.org.tutty.Equalizer;

public class SurveyBuilder {

	private Survey survey;
	
	private LabelBuilder labelBuilder;
	private MetadataGroupBuilder metadataGroupBuilder;
	private ChoiceOptionBuilder choiceOptionBuilder;
	
	public SurveyBuilder() {
		survey = new Survey();

		labelBuilder = new LabelBuilder();
		metadataGroupBuilder = new MetadataGroupBuilder();
		choiceOptionBuilder = new ChoiceOptionBuilder();
	}

	public Survey build() {
		return this.survey;
	}
	
	public SurveyBuilder buildFromDto(SurveyDto dto) {
		Equalizer.equalize(dto, survey);
		survey.setIdentity(buildIdentityFromDto(dto.identity));
		survey.setMetaInfo(buildMetaInfoFromDto(dto.metainfo));
		buildItemContainerFromDto(dto.itemContainer);
		
		return this;
	}

	public Identity buildIdentityFromDto(IdentityDto dto) {
		Identity identity = new Identity();
		Equalizer.equalize(dto, identity);
		
		return identity;
	}

	public MetaInfo buildMetaInfoFromDto(MetaInfoDto dto) {
		MetaInfo metainfo = new MetaInfo();
		Equalizer.equalize(dto, metainfo);
		
		return metainfo;
	}

	public SurveyBuilder buildItemContainerFromDto(List<SurveyItemDto> surveyItemDtoList) {
		for (SurveyItemDto surveyItemDto : surveyItemDtoList) {
			survey.getItemContainer().add(buildSurveyItem(surveyItemDto));
		}
		
		return this;
	}

	private SurveyItem buildSurveyItem(SurveyItemDto surveyItemDto) {

		/*
		SurveyItem surveyItem = new SurveyItem();
		
		surveyItem.setLabel(labelBuilder.buildFromDto(surveyItemDto.label).build());
		surveyItem.setMetadata(metadataGroupBuilder.buildFromDto(surveyItemDto.metadata).build());
		surveyItem.setFillingRules(null);
		
		if(surveyItemDto.objectType.equals("IntegerQuestion")  || surveyItemDto.objectType.equals("DecimalQuestion")) {
		//	surveyItem.setUnit((Unit) labelBuilder.buildFromDto(surveyItemDto.unit).build());
		}
		
		if(surveyItemDto.objectType.equals("SingleSelectionQuestion")  || surveyItemDto.objectType.equals("CheckboxQuestion")) {
			for (ChoiceOptionDto choiceOptionDto : surveyItemDto.options) {
				surveyItem.getOptions().add(choiceOptionBuilder.buildFromDto(choiceOptionDto).build());
			}
		}
		
		if(surveyItemDto.objectType.equals("TextItem")) {
			//surveyItem.setValue(labelBuilder.buildFromDto(surveyItemDto.value).build());
		}
		
		if(surveyItemDto.objectType.equals("ImageItem")) {
			surveyItem.setUrl(surveyItemDto.url);
			surveyItem.setFooter(labelBuilder.buildFromDto(surveyItemDto.footer).build());
		}
		*/
		return null;
	}

}
