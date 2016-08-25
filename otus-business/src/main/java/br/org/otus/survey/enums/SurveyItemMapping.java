package br.org.otus.survey.enums;

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
	
	CALENDAR_QUESTION(CalendarQuestionDto.class, "CalendarQuestion"),
	INTEGER_QUESTION(IntegerQuestionDto.class, "IntegerQuestion"),
	DECIMAL_QUESTION(DecimalQuestionDto.class, "DecimalQuestion"),
	SINGLE_SELECTION_QUESTION(SingleSelectionQuestionDto.class, "SingleSelectionQuestion"),
	CHECKBOX_QUESTION(CheckboxQuestionDto.class, "CheckboxQuestion"),
	TEXT_QUESTION(TextQuestionDto.class, "TextQuestion"),
	EMAIL_QUESTION(EmailQuestionDto.class, "EmailQuestion"),
	TIME_QUESTION(TimeQuestionDto.class, "TimeQuestion"),
	PHONE_QUESTION(PhoneQuestionDto.class, "PhoneQuestion"),
	
	TEXT_ITEM(TextItemDto.class, "TextItem"),
	IMAGE_ITEM(ImageItemDto.class, "ImageItem");
	
	private Class<? extends SurveyItemDto> surveyItemDto;
	private String type;
	
	private SurveyItemMapping(Class<? extends SurveyItemDto> surveyItemDto, String type) {
		this.surveyItemDto = surveyItemDto;
		this.type = type;
	}
	
	public Class<? extends SurveyItemDto> getDtoClass() {
		return surveyItemDto;
	}

	public String getSurveyItemType() {
		return type;
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
