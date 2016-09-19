package br.org.otus.survey.dtos.item.fillingRules.validators.integer;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.integer.InDto;

public class InDtoTest {
	
	private String json;
	private InDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"in\",\"data\": {\"reference\": {\"initial\": 1,\"end\": 11}}}";

		dto = new Gson().fromJson(json, InDto.class);
	}

	@Test
	public void should_deserialize_correctly_InDto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("in", dto.validatorType);
		assertEquals(Integer.valueOf("1"), dto.data.reference.initial);
		assertEquals(Integer.valueOf("11"), dto.data.reference.end);
	}

}
