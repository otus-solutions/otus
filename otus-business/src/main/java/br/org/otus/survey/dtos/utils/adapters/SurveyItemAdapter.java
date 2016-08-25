package br.org.otus.survey.dtos.utils.adapters;

import java.lang.reflect.Type;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import br.org.otus.survey.enums.SurveyItemMapping;

public class SurveyItemAdapter implements JsonDeserializer<Object>, JsonSerializer<Object> {

	private static final String OBJECT_TYPE = "objectType";
	
	@Override
	public JsonElement serialize(Object src, Type typeOfSrc, JsonSerializationContext context) {
		return context.serialize(src);
	}
	
	@Override
	public Object deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
			throws JsonParseException {
		
		JsonPrimitive prim = (JsonPrimitive) json.getAsJsonObject().get(OBJECT_TYPE);
        String objectType = prim.getAsString();
		return context.deserialize(json, SurveyItemMapping.getEnumByObjectType(objectType).getDtoClass());
	}

}
