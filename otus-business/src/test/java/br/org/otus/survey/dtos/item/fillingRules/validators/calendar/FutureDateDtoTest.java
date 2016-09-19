package br.org.otus.survey.dtos.item.fillingRules.validators.calendar;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.calendar.FutureDateDto;

public class FutureDateDtoTest {
	
	private String json;
	private FutureDateDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"futureDate\",\"data\": {\"reference\": true}}";

		dto = new Gson().fromJson(json, FutureDateDto.class);
	}

	@Test
	public void should_deserialize_correctly_FutureDateDto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("futureDate", dto.validatorType);
		assertTrue(dto.data.reference);
	}

}
