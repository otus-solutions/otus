package br.org.otus.survey.dtos.item.fillingRules.validators.text;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.text.LowerCaseDto;

public class LowerCaseDtoTest {
	
	private String json;
	private LowerCaseDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"lowerCase\",\"data\": {\"reference\": true}}";

		dto = new Gson().fromJson(json, LowerCaseDto.class);
	}

	@Test
	public void should_deserialize_correctly_LowerCase_Dto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("lowerCase", dto.validatorType);
		assertTrue(dto.data.reference);
	}

}
