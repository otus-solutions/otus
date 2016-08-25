package br.org.otus.survey.dtos.item;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import br.org.otus.survey.dtos.item.SurveyItemDto;
import br.org.otus.survey.dtos.item.label.LabelDto;
import br.org.otus.survey.dtos.item.miscellaneous.ImageItemDto;
import br.org.otus.survey.dtos.item.miscellaneous.TextItemDto;
import br.org.otus.survey.dtos.item.questions.CalendarQuestionDto;
import br.org.otus.survey.dtos.item.questions.EmailQuestionDto;
import br.org.otus.survey.dtos.item.questions.PhoneQuestionDto;
import br.org.otus.survey.dtos.item.questions.TextQuestionDto;
import br.org.otus.survey.dtos.item.questions.TimeQuestionDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.FillingRulesDto;
import br.org.otus.survey.dtos.item.questions.metadata.MetadataGroupDto;
import br.org.otus.survey.dtos.item.questions.numeric.DecimalQuestionDto;
import br.org.otus.survey.dtos.item.questions.numeric.IntegerQuestionDto;
import br.org.otus.survey.dtos.item.questions.numeric.unit.UnitDto;
import br.org.otus.survey.dtos.item.questions.selectable.CheckboxQuestionDto;
import br.org.otus.survey.dtos.item.questions.selectable.SingleSelectionQuestionDto;
import br.org.otus.survey.dtos.utils.adapters.SurveyItemAdapter;

public class SurveyItemDtoTest {
	
	private SurveyItemDto surveyItemDto;
	private Gson gson;
	
	@Before
	public void setUp() {
		GsonBuilder builder = new GsonBuilder();
		builder.registerTypeAdapter(SurveyItemDto.class, new SurveyItemAdapter());
		gson = builder.create();
	}
	
	@Test
	public void should_deserialize_correctly_Calendar_Question() {
		surveyItemDto = gson.fromJson(SurveyItemTestUtils.CALENDAR_QUESTION.json(), SurveyItemDto.class);
		
		CalendarQuestionDto calendarQuestionDto = new CalendarQuestionDto();
		calendarQuestionDto = (CalendarQuestionDto) surveyItemDto;
		
		assertTrue(surveyItemDto instanceof CalendarQuestionDto);
		
		assertEquals("SurveyItem", calendarQuestionDto.extents);
		assertEquals("CalendarQuestion", calendarQuestionDto.objectType);
		assertEquals("TY1", calendarQuestionDto.templateID);
		assertEquals("TY1", calendarQuestionDto.customID);
		assertEquals("LocalDate", calendarQuestionDto.dataType);
		
		assertTrue(calendarQuestionDto.label instanceof LabelDto);
		assertTrue(calendarQuestionDto.metadata instanceof MetadataGroupDto);
		assertTrue(calendarQuestionDto.fillingRules instanceof FillingRulesDto);
	}
	
	@Test
	public void should_deserialize_correctly_Integer_Question() {
		surveyItemDto = gson.fromJson(SurveyItemTestUtils.INTEGER_QUESTION.json(), SurveyItemDto.class);
		
		IntegerQuestionDto integerQuestionDto = new IntegerQuestionDto();
		integerQuestionDto = (IntegerQuestionDto) surveyItemDto;
		
		
		assertEquals("SurveyItem", integerQuestionDto.extents);
		assertEquals("IntegerQuestion", integerQuestionDto.objectType);
		assertEquals("TY2", integerQuestionDto.templateID);
		assertEquals("TY2", integerQuestionDto.customID);
		assertEquals("Integer", integerQuestionDto.dataType);
		
		assertTrue(integerQuestionDto.label instanceof LabelDto);
		assertTrue(integerQuestionDto.metadata instanceof MetadataGroupDto);
		assertTrue(integerQuestionDto.fillingRules instanceof FillingRulesDto);
		
		assertTrue(integerQuestionDto.unit instanceof UnitDto);
	}

	@Test
	public void should_deserialize_correctly_Decimal_Question() {
		surveyItemDto = gson.fromJson(SurveyItemTestUtils.DECIMAL_QUESTION.json(), SurveyItemDto.class);
		
		DecimalQuestionDto decimalQuestionDto = new DecimalQuestionDto();
		decimalQuestionDto = (DecimalQuestionDto) surveyItemDto;
		
		assertEquals("SurveyItem", decimalQuestionDto.extents);
		assertEquals("DecimalQuestion", decimalQuestionDto.objectType);
		assertEquals("TY3", decimalQuestionDto.templateID);
		assertEquals("TY3", decimalQuestionDto.customID);
		assertEquals("Decimal", decimalQuestionDto.dataType);
		
		assertTrue(decimalQuestionDto.label instanceof LabelDto);
		assertTrue(decimalQuestionDto.metadata instanceof MetadataGroupDto);
		assertTrue(decimalQuestionDto.fillingRules instanceof FillingRulesDto);

		assertTrue(decimalQuestionDto.unit instanceof UnitDto);
	}
	
	@Test
	public void should_deserialize_correctly_Text_Question() {
		surveyItemDto = gson.fromJson(SurveyItemTestUtils.TEXT_QUESTION.json(), SurveyItemDto.class);
		
		TextQuestionDto textQuestionDto = new TextQuestionDto();
		textQuestionDto = (TextQuestionDto) surveyItemDto;
		
		assertEquals("SurveyItem", textQuestionDto.extents);
		assertEquals("TextQuestion", textQuestionDto.objectType);
		assertEquals("TY6", textQuestionDto.templateID);
		assertEquals("TY6", textQuestionDto.customID);
		assertEquals("String", textQuestionDto.dataType);
		
		assertTrue(textQuestionDto.label instanceof LabelDto);
		assertTrue(textQuestionDto.metadata instanceof MetadataGroupDto);
		assertTrue(textQuestionDto.fillingRules instanceof FillingRulesDto);
	}

	@Test
	public void should_deserialize_correctly_Email_Question() {
		surveyItemDto = gson.fromJson(SurveyItemTestUtils.EMAIL_QUESTION.json(), SurveyItemDto.class);
		
		EmailQuestionDto emailQuestionDto = new EmailQuestionDto();
		emailQuestionDto = (EmailQuestionDto) surveyItemDto;
		
		assertEquals("SurveyItem", emailQuestionDto.extents);
		assertEquals("EmailQuestion", emailQuestionDto.objectType);
		assertEquals("TY7", emailQuestionDto.templateID);
		assertEquals("TY7", emailQuestionDto.customID);
		assertEquals("String", emailQuestionDto.dataType);
		
		assertTrue(emailQuestionDto.label instanceof LabelDto);
		assertTrue(emailQuestionDto.metadata instanceof MetadataGroupDto);
		assertTrue(emailQuestionDto.fillingRules instanceof FillingRulesDto);
	}

	@Test
	public void should_deserialize_correctly_Phone_Question() {
		surveyItemDto = gson.fromJson(SurveyItemTestUtils.PHONE_QUESTION.json(), SurveyItemDto.class);
		
		PhoneQuestionDto phoneQuestionDto = new PhoneQuestionDto();
		phoneQuestionDto = (PhoneQuestionDto) surveyItemDto;
		
		assertEquals("SurveyItem", phoneQuestionDto.extents);
		assertEquals("PhoneQuestion", phoneQuestionDto.objectType);
		assertEquals("TY9", phoneQuestionDto.templateID);
		assertEquals("TY9", phoneQuestionDto.customID);
		assertEquals("Integer", phoneQuestionDto.dataType);
		
		assertTrue(phoneQuestionDto.label instanceof LabelDto);
		assertTrue(phoneQuestionDto.metadata instanceof MetadataGroupDto);
		assertTrue(phoneQuestionDto.fillingRules instanceof FillingRulesDto);
	}
	
	@Test
	public void should_deserialize_correctly_Time_Question() {
		surveyItemDto = gson.fromJson(SurveyItemTestUtils.TIME_QUESTION.json(), SurveyItemDto.class);
		
		TimeQuestionDto timeQuestionDto = new TimeQuestionDto();
		timeQuestionDto = (TimeQuestionDto) surveyItemDto;
		
		assertEquals("SurveyItem", timeQuestionDto.extents);
		assertEquals("TimeQuestion", timeQuestionDto.objectType);
		assertEquals("TY8", timeQuestionDto.templateID);
		assertEquals("TY8", timeQuestionDto.customID);
		assertEquals("LocalTime", timeQuestionDto.dataType);
		
		assertTrue(timeQuestionDto.label instanceof LabelDto);
		assertTrue(timeQuestionDto.metadata instanceof MetadataGroupDto);
		assertTrue(timeQuestionDto.fillingRules instanceof FillingRulesDto);
	}
	
	@Test
	public void should_deserialize_correctly_Single_Selection_Question() {
		surveyItemDto = gson.fromJson(SurveyItemTestUtils.SINGLE_SELECTION_QUESTION.json(), SurveyItemDto.class);
		
		SingleSelectionQuestionDto singleSelectionQuestionDto = new SingleSelectionQuestionDto();
		singleSelectionQuestionDto = (SingleSelectionQuestionDto) surveyItemDto;
		
		
		assertEquals("SurveyItem", singleSelectionQuestionDto.extents);
		assertEquals("SingleSelectionQuestion", singleSelectionQuestionDto.objectType);
		assertEquals("TY4", singleSelectionQuestionDto.templateID);
		assertEquals("TY4", singleSelectionQuestionDto.customID);
		assertEquals("Integer", singleSelectionQuestionDto.dataType);
		
		assertTrue(singleSelectionQuestionDto.label instanceof LabelDto);
		assertTrue(singleSelectionQuestionDto.metadata instanceof MetadataGroupDto);
		assertTrue(singleSelectionQuestionDto.fillingRules instanceof FillingRulesDto);

		assertTrue(singleSelectionQuestionDto.options instanceof List<?>);
	}

	@Test
	public void should_deserialize_correctly_Checkbox_Question() {
		surveyItemDto = gson.fromJson(SurveyItemTestUtils.CHECKBOX_QUESTION.json(), SurveyItemDto.class);
		
		CheckboxQuestionDto checkboxQuestionDto = new CheckboxQuestionDto();
		checkboxQuestionDto = (CheckboxQuestionDto) surveyItemDto;
		
		assertEquals("SurveyItem", checkboxQuestionDto.extents);
		assertEquals("CheckboxQuestion", checkboxQuestionDto.objectType);
		assertEquals("TY5", checkboxQuestionDto.templateID);
		assertEquals("TY5", checkboxQuestionDto.customID);
		assertEquals("Array", checkboxQuestionDto.dataType);
		
		assertTrue(checkboxQuestionDto.label instanceof LabelDto);
		assertTrue(checkboxQuestionDto.metadata instanceof MetadataGroupDto);
		assertTrue(checkboxQuestionDto.fillingRules instanceof FillingRulesDto);

		assertTrue(checkboxQuestionDto.options instanceof List<?>);
	}
	
	@Test
	public void should_deserialize_correctly_Text_Item() {
		surveyItemDto = gson.fromJson(SurveyItemTestUtils.TEXT_ITEM.json(), SurveyItemDto.class);
		
		TextItemDto textItemDto = new TextItemDto();
		textItemDto = (TextItemDto) surveyItemDto;
		
		assertEquals("SurveyItem", textItemDto.extents);
		assertEquals("TextItem", textItemDto.objectType);
		assertEquals("TY10", textItemDto.templateID);
		assertEquals("TY10", textItemDto.customID);
		assertEquals("String", textItemDto.dataType);
		
		assertTrue(textItemDto.value instanceof LabelDto);
	}

	@Test
	public void should_deserialize_correctly_Image_Item() {
		surveyItemDto = gson.fromJson(SurveyItemTestUtils.IMAGE_ITEM.json(), SurveyItemDto.class);
		
		ImageItemDto imageItemDto = new ImageItemDto();
		imageItemDto = (ImageItemDto) surveyItemDto;
		
		assertEquals("SurveyItem", imageItemDto.extents);
		assertEquals("ImageItem", imageItemDto.objectType);
		assertEquals("TY11", imageItemDto.templateID);
		assertEquals("TY11", imageItemDto.customID);
		assertEquals("String", imageItemDto.dataType);
		
		assertEquals("http://www.site.com/imagem.jpg", imageItemDto.url);

		assertTrue(imageItemDto.footer instanceof LabelDto);
	}
	
}
