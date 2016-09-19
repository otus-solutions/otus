package br.org.otus.survey.dtos.item.fillingRules.validators.integer;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.integer.LowerLimitDto;

public class LowerLimitDtoTest {

	private String json;
	private LowerLimitDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"lowerLimit\",\"data\": {\"reference\": 1}}";

		dto = new Gson().fromJson(json, LowerLimitDto.class);
	}

	@Test
	public void should_deserialize_correctly_LowerLimitDto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("lowerLimit", dto.validatorType);
		assertEquals(Integer.valueOf("1"), dto.data.reference);
	}

}
