package br.org.otus.survey.dtos.identity;

import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.survey.dtos.identity.IdentityDto;

public class IdentityDtoTest {
	
	private IdentityDto identityDto;
	
	@Before
	public void setUp() {
		String json = ""
				+ "{\"extents\": \"StudioObject\","
				+ "\"objectType\": \"SurveyIdentity\","
				+ "\"name\": \"Formulário Teste\","
				+ "\"acronym\": \"TST\","
				+ "\"recommendedTo\": \"Qualquer pesquisa\","
				+ "\"description\": \"Descrição do formulário\","
				+ "\"keywords\": [\"TESTE\", \"TST\"]}";
		
		identityDto = new Gson().fromJson(json, IdentityDto.class);
	}
	
	@Test
	public void should_parse_correctly_extends_attribute() {
		assertEquals("StudioObject", identityDto.extents);
	}

	@Test
	public void should_parse_correctly_objectType_attribute() {
		assertEquals("SurveyIdentity", identityDto.objectType);
	}

	@Test
	public void should_parse_correctly_name_attribute() {
		assertEquals("Formulário Teste", identityDto.name);
	}

	@Test
	public void should_parse_correctly_acronym_attribute() {
		assertEquals("TST", identityDto.acronym);
	}

	@Test
	public void should_parse_correctly_recommendedTo_attribute() {
		assertEquals("Qualquer pesquisa", identityDto.recommendedTo);
	}

	@Test
	public void should_parse_correctly_description_attribute() {
		assertEquals("Descrição do formulário", identityDto.description);
	}

	@Test
	public void should_parse_correctly_keywords_attribute() {
		List<String> keywords = Arrays.asList("TESTE", "TST");
		assertEquals(keywords, identityDto.keywords);
	}

}
