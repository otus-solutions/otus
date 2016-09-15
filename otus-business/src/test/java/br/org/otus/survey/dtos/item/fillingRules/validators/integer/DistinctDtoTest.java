package br.org.otus.survey.dtos.item.fillingRules.validators.integer;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.integer.DistinctDto;

public class DistinctDtoTest {
	
	private String json;
	private DistinctDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"distinct\",\"data\": {\"reference\": 1}}";

		dto = new Gson().fromJson(json, DistinctDto.class);
	}

	@Test
	public void should_deserialize_correctly_Distinct_Dto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("distinct", dto.validatorType);
		assertEquals(Integer.valueOf("1"), dto.data.reference);
	}

}
