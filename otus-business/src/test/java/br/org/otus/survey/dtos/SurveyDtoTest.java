package br.org.otus.survey.dtos;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.SurveyDto;
import br.org.otus.survey.dtos.identity.IdentityDto;
import br.org.otus.survey.dtos.metainfo.MetaInfoDto;

public class SurveyDtoTest {
	
	private SurveyDto surveyDto;
	
	@Before
	public void setUp() {
		String json = ""
				+ "{\"extents\": \"StudioObject\","
				+ "\"objectType\": \"Survey\","
				+ "\"oid\": \"dXNlclVVSUQ6W3VuZGVmaW5lZF1zdXJ2ZXlVVUlEOls3MDZlMTE2MC02M2I5LTExZTYtOWJjNy0xNWVhN2RkZDA4NTZdcmVwb3NpdG9yeVVVSUQ6WyBOb3QgZG9uZSB5ZXQgXQ==\","
				+ "\"identity\": {},"
				+ "\"metainfo\": {},"
				+ "\"itemContainer\": [],"
				+ "\"navigationList\": []}";
		
		surveyDto = new Gson().fromJson(json, SurveyDto.class);
	}
	
	@Test
	public void should_deserialize_correctly_Survey_Json() {
		assertEquals("StudioObject", surveyDto.extents);
		assertEquals("Survey", surveyDto.objectType);
		assertEquals("dXNlclVVSUQ6W3VuZGVmaW5lZF1zdXJ2ZXlVVUlEOls3MDZlMTE2MC02M2I5LTExZTYtOWJjNy0xNWVhN2RkZDA4NTZdcmVwb3NpdG9yeVVVSUQ6WyBOb3QgZG9uZSB5ZXQgXQ==", surveyDto.oid);
		
		assertTrue(surveyDto.identity instanceof IdentityDto);
		assertTrue(surveyDto.metainfo instanceof MetaInfoDto);
		assertTrue(surveyDto.itemContainer instanceof List<?>);
		assertTrue(surveyDto.navigationList instanceof List<?>);
	}
	
}
