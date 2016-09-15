package br.org.otus.survey.dtos.item.fillingRules.validators.calendar;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.calendar.MinDateDto;

public class MinDateDtoTest {
	
	private String json;
	private MinDateDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"minDate\",\"data\": {\"reference\": \"2016-12-01T02:00:00.000Z\"}}";

		dto = new Gson().fromJson(json, MinDateDto.class);
	}

	@Test	
	public void should_deserialize_correctly_Min_Date_Dto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("minDate", dto.validatorType);
		assertEquals("2016-12-01T02:00:00.000Z", dto.data.reference);
	}

}
