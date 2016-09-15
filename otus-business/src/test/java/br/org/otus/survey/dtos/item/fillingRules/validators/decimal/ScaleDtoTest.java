package br.org.otus.survey.dtos.item.fillingRules.validators.decimal;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.decimal.ScaleDto;

public class ScaleDtoTest {
	
	private String json;
	private ScaleDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"scale\",\"data\": {\"reference\": 2}}";

		dto = new Gson().fromJson(json, ScaleDto.class);
	}

	@Test
	public void should_deserialize_correctly_Scale_Dto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("scale", dto.validatorType);
		assertEquals(Integer.valueOf("2"), dto.data.reference);
	}


}
