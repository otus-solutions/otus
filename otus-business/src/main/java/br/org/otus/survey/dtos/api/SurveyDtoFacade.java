package br.org.otus.survey.dtos.api;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import br.org.otus.survey.dtos.SurveyDto;
import br.org.otus.survey.dtos.item.SurveyItemDto;
import br.org.otus.survey.dtos.utils.adapters.SurveyItemAdapter;

public class SurveyDtoFacade {

	public static SurveyDto deserialize(String surveyJson) {
		GsonBuilder builder = new GsonBuilder();
		builder.registerTypeAdapter(SurveyItemDto.class, new SurveyItemAdapter());
		Gson gson = builder.create();

		return gson.fromJson(surveyJson, SurveyDto.class);
	}

	public static String serialize(SurveyDto surveyDto) {
		GsonBuilder builder = new GsonBuilder();
		builder.registerTypeAdapter(SurveyItemDto.class, new SurveyItemAdapter());
		builder.disableHtmlEscaping();
		Gson gson = builder.create();

		return gson.toJson(surveyDto);
	}

}
