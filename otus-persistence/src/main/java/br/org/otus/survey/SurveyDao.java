package br.org.otus.survey;

import br.org.mongodb.MongoGenericDao;
import static com.mongodb.client.model.Filters.*;

import org.bson.Document;

import com.mongodb.client.FindIterable;

public class SurveyDao extends MongoGenericDao {

	private static final String ACRONYM = "acronym";
	private static final String COLLECTION_NAME = "surveys";

	public SurveyDao() {
		super(COLLECTION_NAME);
	}
	
	public FindIterable<Document> findByAcronym(String acronym) {
		return collection.find(eq(ACRONYM, acronym));
	}
	
}
