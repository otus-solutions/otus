package br.org.otus.survey.dtos.item.fillingRules.validators.integer;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.integer.UpperLimitDto;

public class UpperLimitDtoTest {
	
	private String json;
	private UpperLimitDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"upperLimit\",\"data\": {\"reference\": 1}}";

		dto = new Gson().fromJson(json, UpperLimitDto.class);
	}

	@Test
	public void should_deserialize_correctly_Upper_Limit_Dto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("upperLimit", dto.validatorType);
		assertEquals(Integer.valueOf("1"), dto.data.reference);
	}

}
