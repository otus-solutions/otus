package br.org.otus.survey.dto.navigation;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

public class RouteDtoTest {
	
	private RouteDto routeDto;
	
	@Before
	public void setUp() {
		
		String routeJson = "{"
				+ "\"extents\": \"StudioObject\","
				+ "\"objectType\": \"Route\","
				+ "\"name\": \"1\","
				+ "\"origin\": \"CO1\","
				+ "\"destination\": \"CO2\","
				+ "\"conditionSet\": {}}";
		
		routeDto = new Gson().fromJson(routeJson, RouteDto.class);
	}
	
	@Test
	public void should_deserialize_correctly_Route_Json() {
		
		assertEquals("StudioObject", routeDto.extents);
		assertEquals("Route", routeDto.objectType);
		assertEquals("1", routeDto.name);
		assertEquals("CO1", routeDto.origin);
		assertEquals("CO2", routeDto.destination);
		
		assertTrue(routeDto.conditionSet instanceof RouteConditionSetDto);
	}

}
