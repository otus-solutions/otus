package br.org.otus.survey.dtos.item.fillingRules.validators.text;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.text.MaxLengthDto;

public class MaxLengthDtoTest {
	
	private String json;
	private MaxLengthDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"maxLength\",\"data\": {\"reference\": 5}}";

		dto = new Gson().fromJson(json, MaxLengthDto.class);
	}

	@Test
	public void should_deserialize_correctly_MaxLengthDto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("maxLength", dto.validatorType);
		assertEquals(Integer.valueOf("5"), dto.data.reference);
	}

}
