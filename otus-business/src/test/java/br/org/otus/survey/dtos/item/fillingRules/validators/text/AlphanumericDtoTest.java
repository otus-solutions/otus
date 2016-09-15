package br.org.otus.survey.dtos.item.fillingRules.validators.text;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.text.AlphanumericDto;

public class AlphanumericDtoTest {
	
	private String json;
	private AlphanumericDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"alphanumeric\",\"data\": {\"reference\": true}}";

		dto = new Gson().fromJson(json, AlphanumericDto.class);
	}

	@Test
	public void should_deserialize_correctly_Alphanumeric_Dto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("alphanumeric", dto.validatorType);
		assertTrue(dto.data.reference);
	}

}
