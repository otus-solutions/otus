package br.org.otus.survey.dto.item.metadata;

import static org.junit.Assert.assertEquals;

import static org.junit.Assert.assertTrue;
import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dto.item.metadata.MetadataOptionsDto;
import br.org.otus.survey.dto.label.LabelDto;

public class MetadataOptionsDtoTest {
	
	private MetadataOptionsDto metadataOptionsDto;
	
	@Before
	public void setUp() {
		String json = "{\"extents\": \"StudioObject\","
				+ "\"objectType\": \"MetadataAnswer\","
				+ "\"dataType\": \"Integer\","
				+ "\"value\": 1,"
				+ "\"label\": "
					+ "{\"ptBR\": "
						+ "{\"extends\": \"StudioObject\","
						+ "\"objectType\": \"Label\","
						+ "\"oid\": \"123\","
						+ "\"plainText\": \"A participante não quer responder\","
						+ "\"formattedText\": \"<div>A participante não quer responder</div>\"},"
					+ "\"enUS\":"
						+ "{\"extends\": \"StudioObject\","
						+ "\"objectType\": \"Label\","
						+ "\"oid\": \"1561156\","
						+ "\"plainText\": \"The participant does not want to answer\","
						+ "\"formattedText\": \"<div>The participant does not want to answer</div>\"},"
					+ "\"esES\": {\"extends\": \"StudioObject\","
						+ "\"objectType\": \"Label\","
						+ "\"oid\": \"465465\","
						+ "\"plainText\": \"El participante no quiere contestar\","
						+ "\"formattedText\": \"<div>El participante no quiere contestar</div>\"}}}";
		
		metadataOptionsDto = new Gson().fromJson(json, MetadataOptionsDto.class);
	}
	
	@Test
	public void should_parse_correctly_extends_attribute() {
		assertEquals("StudioObject", metadataOptionsDto.extents);
	}

	@Test
	public void should_parse_correctly_objectType_attribute() {
		assertEquals("MetadataAnswer", metadataOptionsDto.objectType);
	}

	@Test
	public void should_parse_correctly_dataType_attribute() {
		assertEquals("Integer", metadataOptionsDto.dataType);
	}

	@Test
	public void should_parse_correctly_value_attribute() {
		assertEquals("1", metadataOptionsDto.value);
	}

	@Test
	public void should_parse_correctly_label_attribute() {
		assertTrue(metadataOptionsDto.label instanceof LabelDto);
	}

}
