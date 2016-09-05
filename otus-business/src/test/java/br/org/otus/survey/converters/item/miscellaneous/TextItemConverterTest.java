package br.org.otus.survey.converters.item.miscellaneous;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import br.org.otus.survey.dtos.item.SurveyItemDto;
import br.org.otus.survey.dtos.item.SurveyItemTestUtils;
import br.org.otus.survey.dtos.item.miscellaneous.TextItemDto;
import br.org.otus.survey.dtos.utils.adapters.SurveyItemAdapter;
import br.org.otus.survey.item.miscellaneous.TextItem;

public class TextItemConverterTest {
	
	private TextItem textItem;
	private Gson gson;
	private TextItemConverter textItemConverter;
	private TextItemDto textItemDto;
	
	//TODO
	
	@Ignore
	@Before
	public void setUp() {
		GsonBuilder builder = new GsonBuilder();
		builder.registerTypeAdapter(SurveyItemDto.class, new SurveyItemAdapter());
		gson = builder.create();
		
		//textItemDto = gson.fromJson(SurveyItemTestUtils.TEXT_ITEM.json(), SurveyItemDto.class);
		
		//textItemConverter = new TextItemConverter();
		
	}
	
	@Ignore
	@Test
	public void should_convert_correctly_from_dto_to_entity() {
		textItem = textItemConverter.convertFromDto(textItemDto);
		System.out.println(textItem.toString());
		
	}

}
