package br.org.otus.survey.dto.item;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dto.item.fillingRules.FillingRulesDto;
import br.org.otus.survey.dto.item.metadata.MetadataGroupDto;
import br.org.otus.survey.dto.item.unit.UnitDto;
import br.org.otus.survey.dto.label.LabelDto;

public class SurveyItemDtoTest {
	
	private SurveyItemDto surveyItemDto;
	
	@Test
	public void should_deserialize_correctly_Calendar_Question() {
		surveyItemDto = new Gson().fromJson(SurveyItemUtils.CALENDAR_QUESTION.json(), SurveyItemDto.class);
		
		assertEquals("SurveyItem", surveyItemDto.extents);
		assertEquals("CalendarQuestion", surveyItemDto.objectType);
		assertEquals("TY1", surveyItemDto.templateID);
		assertEquals("TY1", surveyItemDto.customID);
		assertEquals("LocalDate", surveyItemDto.dataType);
		
		assertTrue(surveyItemDto.label instanceof LabelDto);
		assertTrue(surveyItemDto.metadata instanceof MetadataGroupDto);
		assertTrue(surveyItemDto.fillingRules instanceof FillingRulesDto);
	}

	@Test
	public void should_deserialize_correctly_Integer_Question() {
		surveyItemDto = new Gson().fromJson(SurveyItemUtils.INTEGER_QUESTION.json(), SurveyItemDto.class);
		
		assertEquals("SurveyItem", surveyItemDto.extents);
		assertEquals("IntegerQuestion", surveyItemDto.objectType);
		assertEquals("TY2", surveyItemDto.templateID);
		assertEquals("TY2", surveyItemDto.customID);
		assertEquals("Integer", surveyItemDto.dataType);

		assertTrue(surveyItemDto.label instanceof LabelDto);
		assertTrue(surveyItemDto.metadata instanceof MetadataGroupDto);
		assertTrue(surveyItemDto.fillingRules instanceof FillingRulesDto);
		
		assertTrue(surveyItemDto.unit instanceof UnitDto);
	}

	@Test
	public void should_deserialize_correctly_Decimal_Question() {
		surveyItemDto = new Gson().fromJson(SurveyItemUtils.DECIMAL_QUESTION.json(), SurveyItemDto.class);
		
		assertEquals("SurveyItem", surveyItemDto.extents);
		assertEquals("DecimalQuestion", surveyItemDto.objectType);
		assertEquals("TY3", surveyItemDto.templateID);
		assertEquals("TY3", surveyItemDto.customID);
		assertEquals("Decimal", surveyItemDto.dataType);
		
		assertTrue(surveyItemDto.label instanceof LabelDto);
		assertTrue(surveyItemDto.metadata instanceof MetadataGroupDto);
		assertTrue(surveyItemDto.fillingRules instanceof FillingRulesDto);

		assertTrue(surveyItemDto.unit instanceof UnitDto);
	}

	@Test
	public void should_deserialize_correctly_Text_Question() {
		surveyItemDto = new Gson().fromJson(SurveyItemUtils.TEXT_QUESTION.json(), SurveyItemDto.class);
		
		assertEquals("SurveyItem", surveyItemDto.extents);
		assertEquals("TextQuestion", surveyItemDto.objectType);
		assertEquals("TY6", surveyItemDto.templateID);
		assertEquals("TY6", surveyItemDto.customID);
		assertEquals("String", surveyItemDto.dataType);
		
		assertTrue(surveyItemDto.label instanceof LabelDto);
		assertTrue(surveyItemDto.metadata instanceof MetadataGroupDto);
		assertTrue(surveyItemDto.fillingRules instanceof FillingRulesDto);
	}

	@Test
	public void should_deserialize_correctly_Email_Question() {
		surveyItemDto = new Gson().fromJson(SurveyItemUtils.EMAIL_QUESTION.json(), SurveyItemDto.class);
		
		assertEquals("SurveyItem", surveyItemDto.extents);
		assertEquals("EmailQuestion", surveyItemDto.objectType);
		assertEquals("TY7", surveyItemDto.templateID);
		assertEquals("TY7", surveyItemDto.customID);
		assertEquals("String", surveyItemDto.dataType);
		
		assertTrue(surveyItemDto.label instanceof LabelDto);
		assertTrue(surveyItemDto.metadata instanceof MetadataGroupDto);
		assertTrue(surveyItemDto.fillingRules instanceof FillingRulesDto);
	}

	@Test
	public void should_deserialize_correctly_Phone_Question() {
		surveyItemDto = new Gson().fromJson(SurveyItemUtils.PHONE_QUESTION.json(), SurveyItemDto.class);
		
		assertEquals("SurveyItem", surveyItemDto.extents);
		assertEquals("PhoneQuestion", surveyItemDto.objectType);
		assertEquals("TY9", surveyItemDto.templateID);
		assertEquals("TY9", surveyItemDto.customID);
		assertEquals("Integer", surveyItemDto.dataType);
		
		assertTrue(surveyItemDto.label instanceof LabelDto);
		assertTrue(surveyItemDto.metadata instanceof MetadataGroupDto);
		assertTrue(surveyItemDto.fillingRules instanceof FillingRulesDto);
	}
	
	@Test
	public void should_deserialize_correctly_Time_Question() {
		surveyItemDto = new Gson().fromJson(SurveyItemUtils.TIME_QUESTION.json(), SurveyItemDto.class);
		
		assertEquals("SurveyItem", surveyItemDto.extents);
		assertEquals("TimeQuestion", surveyItemDto.objectType);
		assertEquals("TY8", surveyItemDto.templateID);
		assertEquals("TY8", surveyItemDto.customID);
		assertEquals("LocalTime", surveyItemDto.dataType);
		
		assertTrue(surveyItemDto.label instanceof LabelDto);
		assertTrue(surveyItemDto.metadata instanceof MetadataGroupDto);
		assertTrue(surveyItemDto.fillingRules instanceof FillingRulesDto);
	}
	
	@Test
	public void should_deserialize_correctly_Single_Selection_Question() {
		surveyItemDto = new Gson().fromJson(SurveyItemUtils.SINGLE_SELECTION_QUESTION.json(), SurveyItemDto.class);
		
		assertEquals("SurveyItem", surveyItemDto.extents);
		assertEquals("SingleSelectionQuestion", surveyItemDto.objectType);
		assertEquals("TY4", surveyItemDto.templateID);
		assertEquals("TY4", surveyItemDto.customID);
		assertEquals("Integer", surveyItemDto.dataType);
		
		assertTrue(surveyItemDto.label instanceof LabelDto);
		assertTrue(surveyItemDto.metadata instanceof MetadataGroupDto);
		assertTrue(surveyItemDto.fillingRules instanceof FillingRulesDto);

		assertTrue(surveyItemDto.options instanceof List<?>);
	}

	@Test
	public void should_deserialize_correctly_Checkbox_Question() {
		surveyItemDto = new Gson().fromJson(SurveyItemUtils.CHECKBOX_QUESTION.json(), SurveyItemDto.class);
		
		assertEquals("SurveyItem", surveyItemDto.extents);
		assertEquals("CheckboxQuestion", surveyItemDto.objectType);
		assertEquals("TY5", surveyItemDto.templateID);
		assertEquals("TY5", surveyItemDto.customID);
		assertEquals("Array", surveyItemDto.dataType);
		
		assertTrue(surveyItemDto.label instanceof LabelDto);
		assertTrue(surveyItemDto.metadata instanceof MetadataGroupDto);
		assertTrue(surveyItemDto.fillingRules instanceof FillingRulesDto);

		assertTrue(surveyItemDto.options instanceof List<?>);
	}
	
	@Test
	public void should_deserialize_correctly_Text_Item() {
		surveyItemDto = new Gson().fromJson(SurveyItemUtils.TEXT_ITEM.json(), SurveyItemDto.class);
		
		assertEquals("SurveyItem", surveyItemDto.extents);
		assertEquals("TextItem", surveyItemDto.objectType);
		assertEquals("TY10", surveyItemDto.templateID);
		assertEquals("TY10", surveyItemDto.customID);
		assertEquals("String", surveyItemDto.dataType);
		
		assertTrue(surveyItemDto.value instanceof LabelDto);
	}

	@Test
	public void should_deserialize_correctly_Image_Item() {
		surveyItemDto = new Gson().fromJson(SurveyItemUtils.IMAGE_ITEM.json(), SurveyItemDto.class);
		
		assertEquals("SurveyItem", surveyItemDto.extents);
		assertEquals("ImageItem", surveyItemDto.objectType);
		assertEquals("TY11", surveyItemDto.templateID);
		assertEquals("TY11", surveyItemDto.customID);
		assertEquals("String", surveyItemDto.dataType);
		
		assertEquals("http://www.site.com/imagem.jpg", surveyItemDto.url);

		assertTrue(surveyItemDto.footer instanceof LabelDto);
	}

}
