package br.org.otus.survey.dtos.item.fillingRules.validators;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.MandatoryDto;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class MandatoryDtoTest {

	private String json;
	private MandatoryDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"mandatory\",\"data\": {\"reference\": true}}";

		dto = new Gson().fromJson(json, MandatoryDto.class);
	}

	@Test
	public void should_deserialize_correctly_MandatoryDto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("mandatory", dto.validatorType);
		assertTrue(dto.data.reference);
	}
	
}
