package br.org.otus.survey.dtos.item.fillingRules.validators.time;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.time.MinTimeDto;

public class MinTimeDtoTest {
	
	private String json;
	private MinTimeDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"minTime\",\"data\": {\"reference\": \"Wed Mar 25 2015 01:30:00 GMT-0300 (BRT)\"}}";

		dto = new Gson().fromJson(json, MinTimeDto.class);
	}

	@Test	
	public void should_deserialize_correctly_MinTimeDto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("minTime", dto.validatorType);
		assertEquals("Wed Mar 25 2015 01:30:00 GMT-0300 (BRT)", dto.data.reference);
	}

}
