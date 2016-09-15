package br.org.otus.survey.dtos.item.fillingRules.validators.text;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.text.UpperCaseDto;

public class UpperCaseDtoTest {
	
	private String json;
	private UpperCaseDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"upperCase\",\"data\": {\"reference\": true}}";

		dto = new Gson().fromJson(json, UpperCaseDto.class);
	}

	@Test
	public void should_deserialize_correctly_Upper_Case_Dto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("upperCase", dto.validatorType);
		assertTrue(dto.data.reference);
	}


}
