package br.org.otus.survey.dto.item.choiceOptions;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dto.label.LabelDto;

public class ChoiceOptionsDtoTest {
	
	private ChoiceOptionsDto choiceOptionsDto;
	private String checkboxAnswerOptionJson;
	private String answerOptionJson;
	
	@Before
	public void setUp() {
		
		checkboxAnswerOptionJson = ""
				+ "{\"extents\": \"StudioObject\","
				+ "\"objectType\": \"CheckboxAnswerOption\","
				+ "\"optionID\": \"CO2a\","
				+ "\"customOptionID\": \"CO2a\","
				+ "\"dataType\": \"Boolean\","
				+ "\"label\": {}}";
		
		answerOptionJson = ""
				+ "{\"extents\": \"StudioObject\","
				+ "\"objectType\": \"AnswerOption\","
				+ "\"value\": 1,"
				+ "\"dataType\": \"Integer\","
				+ "\"label\": {}}";
	}
	
	@Test
	public void should_deserialize_correctly_Checkbox_Answer_Option() {
		choiceOptionsDto = new Gson().fromJson(checkboxAnswerOptionJson, ChoiceOptionsDto.class);
		
		assertEquals("StudioObject", choiceOptionsDto.extents);
		assertEquals("CheckboxAnswerOption", choiceOptionsDto.objectType);
		assertEquals("CO2a", choiceOptionsDto.optionID);
		assertEquals("CO2a", choiceOptionsDto.customOptionID);
		assertEquals("Boolean", choiceOptionsDto.dataType);
		
		assertTrue(choiceOptionsDto.label instanceof LabelDto);
	}

	@Test
	public void should_deserialize_correctly_Answer_Option() {
		choiceOptionsDto = new Gson().fromJson(answerOptionJson, ChoiceOptionsDto.class);
		
		assertEquals("StudioObject", choiceOptionsDto.extents);
		assertEquals("AnswerOption", choiceOptionsDto.objectType);
		assertEquals(new Integer(1), choiceOptionsDto.value);
		assertEquals("Integer", choiceOptionsDto.dataType);
		
		assertTrue(choiceOptionsDto.label instanceof LabelDto);
	}

}
