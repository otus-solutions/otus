package br.org.otus.survey.dto.label;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dto.label.LabelDto;

import static org.junit.Assert.assertEquals;

public class LabelDtoTest {
	
	public LabelDto labelDto;
	
	@Before
	public void setUp() {
		String json = "{\"ptBR\": "
				+ "{\"extends\": \"StudioObject\","
				+ "\"objectType\": \"Label\","
				+ "\"oid\": \"1\","
				+ "\"plainText\": \"Qual sua data de nascimento?\","
				+ "\"formattedText\": \"<div style='text-align: center;'>Qual sua data de nascimento?</div>\"},"
				+ "\"enUS\": "
				+ "{\"extends\": \"StudioObject\","
				+ "\"objectType\": \"Label\","
				+ "\"oid\": \"2\",\"plainText\": \"What is your birth date?\","
				+ "\"formattedText\": \"<div style='text-align: center;'>What is your birth date?</div>\"},"
				+ "\"esES\": {\"extends\": \"StudioObject\","
				+ "\"objectType\": \"Label\","
				+ "\"oid\": \"3\","
				+ "\"plainText\": \"¿Cuál es su fecha de nacimiento?\","
				+ "\"formattedText\": \"<div style='text-align: center;'>¿Cuál es su fecha de nacimiento?</div>\"}}";
		
		labelDto = new Gson().fromJson(json, LabelDto.class);
	}
	
	@Test
	public void should_parse_correctly_ptBR_extends_attribute() {
		assertEquals("StudioObject", labelDto.ptBR.extents);
	}

	@Test
	public void should_parse_correctly_ptBR_objectType_attribute() {
		assertEquals("Label", labelDto.ptBR.objectType);
	}

	@Test
	public void should_parse_correctly_ptBR_oid_attribute() {
		assertEquals("1", labelDto.ptBR.oid);
	}

	@Test
	public void should_parse_correctly_ptBR_plainText_attribute() {
		assertEquals("Qual sua data de nascimento?", labelDto.ptBR.plainText);
	}

	@Test
	public void should_parse_correctly_ptBR_formattedText_attribute() {
		assertEquals("<div style='text-align: center;'>Qual sua data de nascimento?</div>", labelDto.ptBR.formattedText);
	}

	@Test
	public void should_parse_correctly_enUS_extends_attribute() {
		assertEquals("StudioObject", labelDto.enUS.extents);
	}
	
	@Test
	public void should_parse_correctly_enUS_objectType_attribute() {
		assertEquals("Label", labelDto.enUS.objectType);
	}
	
	@Test
	public void should_parse_correctly_enUS_oid_attribute() {
		assertEquals("2", labelDto.enUS.oid);
	}
	
	@Test
	public void should_parse_correctly_enUS_plainText_attribute() {
		assertEquals("What is your birth date?", labelDto.enUS.plainText);
	}
	
	@Test
	public void should_parse_correctly_enUS_formattedText_attribute() {
		assertEquals("<div style='text-align: center;'>What is your birth date?</div>", labelDto.enUS.formattedText);
	}

	@Test
	public void should_parse_correctly_esES_extends_attribute() {
		assertEquals("StudioObject", labelDto.esES.extents);
	}
	
	@Test
	public void should_parse_correctly_esES_objectType_attribute() {
		assertEquals("Label", labelDto.esES.objectType);
	}
	
	@Test
	public void should_parse_correctly_esES_oid_attribute() {
		assertEquals("3", labelDto.esES.oid);
	}
	
	@Test
	public void should_parse_correctly_esES_plainText_attribute() {
		assertEquals("¿Cuál es su fecha de nacimiento?", labelDto.esES.plainText);
	}
	
	@Test
	public void should_parse_correctly_esES_formattedText_attribute() {
		assertEquals("<div style='text-align: center;'>¿Cuál es su fecha de nacimiento?</div>", labelDto.esES.formattedText);
	}

}
