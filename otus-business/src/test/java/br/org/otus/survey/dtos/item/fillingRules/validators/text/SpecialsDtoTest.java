package br.org.otus.survey.dtos.item.fillingRules.validators.text;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.text.SpecialsDto;

public class SpecialsDtoTest {
	
	private String json;
	private SpecialsDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"specials\",\"data\": {\"reference\": true}}";

		dto = new Gson().fromJson(json, SpecialsDto.class);
	}

	@Test
	public void should_deserialize_correctly_SpecialsDto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("specials", dto.validatorType);
		assertTrue(dto.data.reference);
	}

}
