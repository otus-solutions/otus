package br.org.otus.survey.dtos.item.fillingRules.validators.calendar;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.calendar.PasteDateDto;

public class PasteDateDtoTest {
	
	private String json;
	private PasteDateDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"pastDate\",\"data\": {\"reference\": true}}";

		dto = new Gson().fromJson(json, PasteDateDto.class);
	}

	@Test
	public void should_deserialize_correctly_Paste_Date_Dto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("pastDate", dto.validatorType);
		assertTrue(dto.data.reference);
	}

}
