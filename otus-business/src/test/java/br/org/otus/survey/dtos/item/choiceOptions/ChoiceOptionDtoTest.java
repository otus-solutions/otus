package br.org.otus.survey.dtos.item.choiceOptions;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.label.LabelDto;

public class ChoiceOptionDtoTest {
	
//	private ChoiceOptionDto choiceOptionDto;
//	private String checkboxAnswerOptionJson;
//	private String answerOptionJson;
//	
//	@Before
//	public void setUp() {
//		
//		checkboxAnswerOptionJson = ""
//				+ "{\"extents\": \"StudioObject\","
//				+ "\"objectType\": \"CheckboxAnswerOption\","
//				+ "\"optionID\": \"CO2a\","
//				+ "\"customOptionID\": \"CO2a\","
//				+ "\"dataType\": \"Boolean\","
//				+ "\"label\": {}}";
//		
//		answerOptionJson = ""
//				+ "{\"extents\": \"StudioObject\","
//				+ "\"objectType\": \"AnswerOption\","
//				+ "\"value\": 1,"
//				+ "\"dataType\": \"Integer\","
//				+ "\"label\": {}}";
//	}
//	
//	@Test
//	public void should_deserialize_correctly_Checkbox_Answer_Option() {
//		choiceOptionDto = new Gson().fromJson(checkboxAnswerOptionJson, ChoiceOptionDto.class);
//		
//		assertEquals("StudioObject", choiceOptionDto.extents);
//		assertEquals("CheckboxAnswerOption", choiceOptionDto.objectType);
//		assertEquals("CO2a", choiceOptionDto.optionID);
//		assertEquals("CO2a", choiceOptionDto.customOptionID);
//		assertEquals("Boolean", choiceOptionDto.dataType);
//		
//		assertTrue(choiceOptionDto.label instanceof LabelDto);
//	}
//
//	@Test
//	public void should_deserialize_correctly_Answer_Option() {
//		choiceOptionDto = new Gson().fromJson(answerOptionJson, ChoiceOptionDto.class);
//		
//		assertEquals("StudioObject", choiceOptionDto.extents);
//		assertEquals("AnswerOption", choiceOptionDto.objectType);
//		assertEquals(new Integer(1), choiceOptionDto.value);
//		assertEquals("Integer", choiceOptionDto.dataType);
//		
//		assertTrue(choiceOptionDto.label instanceof LabelDto);
//	}

}
