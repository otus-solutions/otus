package br.org.otus.survey.dtos.navigation;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.navigation.NavigationDto;

public class NavigationDtoTest {
	
private NavigationDto navigationDto;
	
	@Before
	public void setUp() {
		
		String navigationJson = ""
				+ "{\"extents\": \"StudioObject\","
				+ "\"objectType\": \"Navigation\","
				+ "\"origin\": \"CO1\","
				+ "\"routes\": []}";
		
		navigationDto = new Gson().fromJson(navigationJson, NavigationDto.class);
	}
	
	@Test
	public void should_deserialize_correctly_Navigation_Json() {
		
		assertEquals("StudioObject", navigationDto.extents);
		assertEquals("Navigation", navigationDto.objectType);
		assertEquals("CO1", navigationDto.origin);
		
		assertTrue(navigationDto.routes instanceof List<?>);
	}

}
