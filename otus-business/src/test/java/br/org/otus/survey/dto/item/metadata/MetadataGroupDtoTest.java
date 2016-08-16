package br.org.otus.survey.dto.item.metadata;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dto.item.metadata.MetadataGroupDto;

public class MetadataGroupDtoTest {
	
	private MetadataGroupDto metadataGroupDto;
	
	@Before
	public void setUp() {
		String json = ""
				+ "{\"extents\": \"StudioObject\","
				+ "\"objectType\": \"MetadataGroup\","
				+ "\"options\": [{}, {}]}";
		
		metadataGroupDto = new Gson().fromJson(json, MetadataGroupDto.class);
	}
	
	@Test
	public void should_parse_correctly_extends_attribute() {
		assertEquals("StudioObject", metadataGroupDto.extents);
	}

	@Test
	public void should_parse_correctly_objectType_attribute() {
		assertEquals("MetadataGroup", metadataGroupDto.objectType);
	}

	@Test
	public void should_parse_correctly_options_attribute() {
		assertTrue(metadataGroupDto.options instanceof List<?>);
	}

	@Test
	public void should_contain_two_MetadataOptionsDto() {
		assertEquals(2, metadataGroupDto.options.size());
	}

}
