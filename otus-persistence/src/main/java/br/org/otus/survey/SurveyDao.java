package br.org.otus.survey;

import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.ccem.otus.survey.Survey;

import com.mongodb.Block;

import br.org.mongodb.MongoGenericDao;

public class SurveyDao extends MongoGenericDao {

	private static final String COLLECTION_NAME = "surveys";

	public SurveyDao() {
		super(COLLECTION_NAME);
	}

	public List<Survey> find() {
		ArrayList<Survey> surveys = new ArrayList<Survey>();
		list().forEach((Block<Document>) document -> {
			surveys.add(Survey.deserialize(document.toJson()));
		});
		
		return surveys;
	}
	
	public List<Survey> findByAcronym(String acronym) {
		ArrayList<Survey> surveys = new ArrayList<Survey>();
		collection.find(eq("template.identity.acronym", acronym)).forEach((Block<Document>) document -> {
			surveys.add(Survey.deserialize(document.toJson()));
		});
		
		return surveys;
	}
	
}
