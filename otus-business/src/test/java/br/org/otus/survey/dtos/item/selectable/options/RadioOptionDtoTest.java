package br.org.otus.survey.dtos.item.selectable.options;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.label.LabelDto;
import br.org.otus.survey.dtos.item.questions.selectable.options.RadioOptionDto;

public class RadioOptionDtoTest {
	
	private RadioOptionDto radioOptionDto;
	private String radioOptionJson;
	
	@Before
	public void setUp() {
		
		radioOptionJson = ""
				+ "{\"extents\": \"StudioObject\","
				+ "\"objectType\": \"AnswerOption\"," 
				+ "\"value\": 1,"
				+ "\"dataType\": \"Integer\","
				+ "\"label\": {}}";
	}
	
	@Test
	public void should_deserialize_correctly_Radio_Option_Dto() {
		radioOptionDto = new Gson().fromJson(radioOptionJson, RadioOptionDto.class);
		
		assertEquals("StudioObject", radioOptionDto.extents);
		assertEquals("AnswerOption", radioOptionDto.objectType);
		assertEquals(new Integer(1), radioOptionDto.value);
		assertEquals("Integer", radioOptionDto.dataType);
		
		assertTrue(radioOptionDto.label instanceof LabelDto);
	}

}
