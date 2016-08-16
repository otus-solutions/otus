package br.org.otus.survey.dto.metainfo;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

public class MetaInfoDtoTest {

	private MetaInfoDto metainfoDto;
	
	@Before
	public void setUp() {
		String json = "{\"extents\": \"StudioObject\",\"objectType\": \"SurveyMetaInfo\",\"creationDatetime\": 1471355878772,\"otusStudioVersion\": \"1.0\"}";
		metainfoDto = new Gson().fromJson(json, MetaInfoDto.class);
	}
	
	@Test
	public void should_parse_correctly_extends_attribute() {
		assertEquals("StudioObject", metainfoDto.extents);
	}

	@Test
	public void should_parse_correctly_objectType_attribute() {
		assertEquals("SurveyMetaInfo", metainfoDto.objectType);
	}

	@Test
	public void should_parse_correctly_creationDatetime_attribute() {
		assertEquals("1471355878772", metainfoDto.creationDatetime);
	}

	@Test
	public void should_parse_correctly_otusStudioVersion_attribute() {
		assertEquals("1.0", metainfoDto.otusStudioVersion);
	}

}
