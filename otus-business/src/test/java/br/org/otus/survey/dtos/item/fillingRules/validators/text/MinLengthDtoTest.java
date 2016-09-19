package br.org.otus.survey.dtos.item.fillingRules.validators.text;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.text.MinLengthDto;

public class MinLengthDtoTest {
	
	private String json;
	private MinLengthDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"minLength\",\"data\": {\"reference\": 5}}";

		dto = new Gson().fromJson(json, MinLengthDto.class);
	}

	@Test
	public void should_deserialize_correctly_MinLengthDto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("minLength", dto.validatorType);
		assertEquals(Integer.valueOf("5"), dto.data.reference);
	}

}
