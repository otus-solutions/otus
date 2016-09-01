package br.org.otus.survey.enums;

import br.org.otus.survey.builders.item.CalendarQuestionBuilder;
import br.org.otus.survey.builders.item.SurveyItemBuilder;
import br.org.otus.survey.dtos.item.SurveyItemDto;
import br.org.otus.survey.dtos.item.miscellaneous.ImageItemDto;
import br.org.otus.survey.dtos.item.miscellaneous.TextItemDto;
import br.org.otus.survey.dtos.item.questions.CalendarQuestionDto;
import br.org.otus.survey.dtos.item.questions.EmailQuestionDto;
import br.org.otus.survey.dtos.item.questions.PhoneQuestionDto;
import br.org.otus.survey.dtos.item.questions.TextQuestionDto;
import br.org.otus.survey.dtos.item.questions.TimeQuestionDto;
import br.org.otus.survey.dtos.item.questions.numeric.DecimalQuestionDto;
import br.org.otus.survey.dtos.item.questions.numeric.IntegerQuestionDto;
import br.org.otus.survey.dtos.item.questions.selectable.CheckboxQuestionDto;
import br.org.otus.survey.dtos.item.questions.selectable.SingleSelectionQuestionDto;

public enum SurveyItemMapping {
	
	CALENDAR_QUESTION(CalendarQuestionDto.class, "CalendarQuestion", new CalendarQuestionBuilder()),
	INTEGER_QUESTION(IntegerQuestionDto.class, "IntegerQuestion", null),
	DECIMAL_QUESTION(DecimalQuestionDto.class, "DecimalQuestion", null),
	SINGLE_SELECTION_QUESTION(SingleSelectionQuestionDto.class, "SingleSelectionQuestion", null),
	CHECKBOX_QUESTION(CheckboxQuestionDto.class, "CheckboxQuestion", null),
	TEXT_QUESTION(TextQuestionDto.class, "TextQuestion", null),
	EMAIL_QUESTION(EmailQuestionDto.class, "EmailQuestion", null),
	TIME_QUESTION(TimeQuestionDto.class, "TimeQuestion", null),
	PHONE_QUESTION(PhoneQuestionDto.class, "PhoneQuestion", null),
	
	TEXT_ITEM(TextItemDto.class, "TextItem", null),
	IMAGE_ITEM(ImageItemDto.class, "ImageItem", null);
	
	private Class<? extends SurveyItemDto> surveyItemDto;
	private String type;
	private SurveyItemBuilder builder;
	
	private SurveyItemMapping(Class<? extends SurveyItemDto> surveyItemDto, String type, SurveyItemBuilder builder) {
		this.surveyItemDto = surveyItemDto;
		this.type = type;
		this.builder = builder;
	}
	
	public Class<? extends SurveyItemDto> getDtoClass() {
		return surveyItemDto;
	}

	public String getSurveyItemType() {
		return type;
	}
	
	public SurveyItemBuilder getBuilder() {
		return builder;
	}

	public static SurveyItemMapping getEnumByObjectType(String objectType) {
		SurveyItemMapping aux = null;
		
		for (SurveyItemMapping item : values()) {
			if(item.getSurveyItemType().equals(objectType)) {
				aux = item;
			}
		}
		
		return aux;
	}

}
