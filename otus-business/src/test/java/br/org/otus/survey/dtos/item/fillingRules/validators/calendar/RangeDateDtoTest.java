package br.org.otus.survey.dtos.item.fillingRules.validators.calendar;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.calendar.RangeDateDto;

public class RangeDateDtoTest {

	private String json;
	private RangeDateDto dto;

	@Before
	public void setUp() {
		json = "{\"extends\": \"StudioObject\",\"objectType\": \"Rule\",\"validatorType\": \"rangeDate\",\"data\": "
				+ "{\"reference\": {\"initial\": \"2016-09-01T03:00:00.000Z\",\"end\": \"2016-10-01T03:00:00.000Z\"}}}";

		dto = new Gson().fromJson(json, RangeDateDto.class);
	}

	@Test	
	public void should_deserialize_correctly_RangeDateDto() {
		assertEquals("StudioObject", dto.extents);
		assertEquals("Rule", dto.objectType);
		assertEquals("rangeDate", dto.validatorType);
		assertEquals("2016-09-01T03:00:00.000Z", dto.data.reference.initial);
		assertEquals("2016-10-01T03:00:00.000Z", dto.data.reference.end);
	}
}
