package br.org.otus.survey.dtos.item.selectable.options;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.label.LabelDto;
import br.org.otus.survey.dtos.item.questions.selectable.options.CheckboxOptionDto;
import static org.junit.Assert.assertFalse;

public class CheckboxOptionDtoTest {

	private CheckboxOptionDto checkboxOptionDto;
	private String checkboxAnswerOptionJson;
	private String invalid_JSON;

	@Before
	public void setUp() {

		checkboxAnswerOptionJson = ""
				+ "{\"extents\": \"StudioObject\","
				+ "\"objectType\": \"CheckboxAnswerOption\","
				+ "\"optionID\": \"CO2a\","
				+ "\"customOptionID\": \"CO2a\","
				+ "\"dataType\": \"Boolean\","
				+ "\"label\": {}}";
		
		invalid_JSON = ""
				+ "{\"extents\": \"StudioObject\","
				+ "\"objectType\": \"CheckboxAnswerOption\","
				+ "\"optionID\": \"\","
				+ "\"customOptionID\": \"\","
				+ "\"dataType\": \"Boolean\","
				+ "\"label\": {}}";
	}

	@Test
	public void should_deserialize_correctly_Checkbox_Answer_Option() {
		checkboxOptionDto = new Gson().fromJson(checkboxAnswerOptionJson, CheckboxOptionDto.class);

		assertEquals("StudioObject", checkboxOptionDto.extents);
		assertEquals("CheckboxAnswerOption", checkboxOptionDto.objectType);
		assertEquals("CO2a", checkboxOptionDto.optionID);
		assertEquals("CO2a", checkboxOptionDto.customOptionID);
		assertEquals("Boolean", checkboxOptionDto.dataType);

		assertTrue(checkboxOptionDto.label instanceof LabelDto);
	}
	
	@Test
	public void isValid_method_should_return_true_when_there_is_a_OptionID() {
		checkboxOptionDto = new Gson().fromJson(checkboxAnswerOptionJson, CheckboxOptionDto.class);
		
		assertTrue(checkboxOptionDto.isValid());
	}
	
	@Test
	public void isValid_method_should_return_true_when_there_is_a_customOptionID() {
		checkboxOptionDto = new Gson().fromJson(checkboxAnswerOptionJson, CheckboxOptionDto.class);
		
		assertTrue(checkboxOptionDto.isValid());
	}
	
	@Test
	public void isValid_method_should_return_false_when_OptionID_was_null() {
		checkboxOptionDto = new Gson().fromJson(invalid_JSON, CheckboxOptionDto.class);
		
		assertFalse(checkboxOptionDto.isValid());
	}

	@Test
	public void isValid_method_should_return_false_when_customOptionID_was_null() {
		checkboxOptionDto = new Gson().fromJson(invalid_JSON, CheckboxOptionDto.class);
		
		assertFalse(checkboxOptionDto.isValid());
	}
	
}
