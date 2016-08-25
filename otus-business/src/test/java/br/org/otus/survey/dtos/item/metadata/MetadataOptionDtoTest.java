package br.org.otus.survey.dtos.item.metadata;

import static org.junit.Assert.assertEquals;

import static org.junit.Assert.assertTrue;
import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.item.label.LabelDto;
import br.org.otus.survey.dtos.item.questions.metadata.MetadataOptionDto;

public class MetadataOptionDtoTest {
	
	public MetadataOptionDto metadataOptionDto;
	
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
		
		metadataOptionDto = new Gson().fromJson(json, MetadataOptionDto.class);
	}
	
	@Test
	public void should_parse_correctly_extends_attribute() {
		assertEquals("StudioObject", metadataOptionDto.extents);
	}

	@Test
	public void should_parse_correctly_objectType_attribute() {
		assertEquals("MetadataAnswer", metadataOptionDto.objectType);
	}

	@Test
	public void should_parse_correctly_dataType_attribute() {
		assertEquals("Integer", metadataOptionDto.dataType);
	}

	@Test
	public void should_parse_correctly_value_attribute() {
		assertEquals("1", metadataOptionDto.value);
	}

	@Test
	public void should_parse_correctly_label_attribute() {
		assertTrue(metadataOptionDto.label instanceof LabelDto);
	}

}
