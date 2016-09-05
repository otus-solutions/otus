package br.org.otus.survey.enums;

import br.org.otus.survey.converters.item.SurveyItemConverter;
import br.org.otus.survey.converters.item.miscellaneous.ImageItemConverter;
import br.org.otus.survey.converters.item.miscellaneous.TextItemConverter;
import br.org.otus.survey.converters.item.questions.CalendarQuestionConverter;
import br.org.otus.survey.converters.item.questions.EmailQuestionConverter;
import br.org.otus.survey.converters.item.questions.PhoneQuestionConverter;
import br.org.otus.survey.converters.item.questions.TextQuestionConverter;
import br.org.otus.survey.converters.item.questions.TimeQuestionConverter;
import br.org.otus.survey.converters.item.questions.numeric.DecimalQuestionConverter;
import br.org.otus.survey.converters.item.questions.numeric.IntegerQuestionConverter;
import br.org.otus.survey.converters.item.questions.selectable.CheckboxQuestionConverter;
import br.org.otus.survey.converters.item.questions.selectable.SingleSelectionQuestionConverter;
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
	
	CALENDAR_QUESTION(CalendarQuestionDto.class, "CalendarQuestion", new CalendarQuestionConverter()),
	INTEGER_QUESTION(IntegerQuestionDto.class, "IntegerQuestion", new IntegerQuestionConverter()),
	DECIMAL_QUESTION(DecimalQuestionDto.class, "DecimalQuestion", new DecimalQuestionConverter()),
	SINGLE_SELECTION_QUESTION(SingleSelectionQuestionDto.class, "SingleSelectionQuestion", new SingleSelectionQuestionConverter()),
	CHECKBOX_QUESTION(CheckboxQuestionDto.class, "CheckboxQuestion", new CheckboxQuestionConverter()),
	TEXT_QUESTION(TextQuestionDto.class, "TextQuestion", new TextQuestionConverter()),
	EMAIL_QUESTION(EmailQuestionDto.class, "EmailQuestion", new EmailQuestionConverter()),
	TIME_QUESTION(TimeQuestionDto.class, "TimeQuestion", new TimeQuestionConverter()),
	PHONE_QUESTION(PhoneQuestionDto.class, "PhoneQuestion", new PhoneQuestionConverter()),
	
	TEXT_ITEM(TextItemDto.class, "TextItem", new TextItemConverter()),
	IMAGE_ITEM(ImageItemDto.class, "ImageItem", new ImageItemConverter());
	
	private Class<? extends SurveyItemDto> surveyItemDto;
	private String type;
	private SurveyItemConverter converter;
	
	private SurveyItemMapping(Class<? extends SurveyItemDto> surveyItemDto, String type, SurveyItemConverter converter) {
		this.surveyItemDto = surveyItemDto;
		this.type = type;
		this.converter = converter;
	}
	
	public Class<? extends SurveyItemDto> getDtoClass() {
		return surveyItemDto;
	}

	public String getSurveyItemType() {
		return type;
	}
	
	public SurveyItemConverter getConverter() {
		return converter;
	}

	public static SurveyItemMapping getEnumByObjectType(String objectType) {
		SurveyItemMapping aux = null;
		
		for (SurveyItemMapping item : values()) {
			if(item.getSurveyItemType().equals(objectType)) {
				aux = item;
			}
		}
		
		if(aux == null) {
			throw new RuntimeException("Error: " + objectType + " was not found at SurveyItemMapping.");
		};
		
		return aux;
	}

}
