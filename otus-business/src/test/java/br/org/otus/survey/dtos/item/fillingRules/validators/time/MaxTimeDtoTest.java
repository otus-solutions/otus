package br.org.otus.survey.dtos.item.fillingRules.validators.time;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.time.MaxTimeDto;

public class MaxTimeDtoTest {
	
	private String json;
	private MaxTimeDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"maxTime\",\"data\": {\"reference\": \"Wed Mar 25 2015 01:30:00 GMT-0300 (BRT)\"}}";

		dto = new Gson().fromJson(json, MaxTimeDto.class);
	}

	@Test	
	public void should_deserialize_correctly_MaxTimeDto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("maxTime", dto.validatorType);
		assertEquals("Wed Mar 25 2015 01:30:00 GMT-0300 (BRT)", dto.data.reference);
	}

}
