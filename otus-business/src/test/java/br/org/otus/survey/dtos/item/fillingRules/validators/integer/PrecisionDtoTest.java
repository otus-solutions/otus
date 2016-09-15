package br.org.otus.survey.dtos.item.fillingRules.validators.integer;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.integer.PrecisionDto;

public class PrecisionDtoTest {
	
	private String json;
	private PrecisionDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"precision\",\"data\": {\"reference\": 1}}";

		dto = new Gson().fromJson(json, PrecisionDto.class);
	}

	@Test
	public void should_deserialize_correctly_Precision_Dto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("precision", dto.validatorType);
		assertEquals(Integer.valueOf("1"), dto.data.reference);
	}

}
