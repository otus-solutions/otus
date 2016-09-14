package br.org.otus.survey;

import javax.inject.Inject;

import com.google.gson.JsonObject;

import br.org.mongodb.MongoClientEM;
import br.org.mongodb.MongoDao;

public class SurveyDao extends MongoDao {

	private static final String COLLECTION_NAME = "survey";

	@Inject
	private MongoClientEM mongoClientEM;

	public void persist(JsonObject jsonObject) {
		mongoClientEM.persist(COLLECTION_NAME, jsonObject);
	}

}
