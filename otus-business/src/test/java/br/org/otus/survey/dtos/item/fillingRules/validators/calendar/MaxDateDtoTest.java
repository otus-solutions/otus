package br.org.otus.survey.dtos.item.fillingRules.validators.calendar;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.calendar.MaxDateDto;

public class MaxDateDtoTest {

	private String json;
	private MaxDateDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"maxDate\",\"data\": {\"reference\": \"2016-12-01T02:00:00.000Z\"}}";

		dto = new Gson().fromJson(json, MaxDateDto.class);
	}

	@Test
	public void should_deserialize_correctly_Max_Date_Dto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("maxDate", dto.validatorType);
		assertEquals("2016-12-01T02:00:00.000Z", dto.data.reference);
	}
}
