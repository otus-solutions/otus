package br.org.otus.survey;

import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.ccem.otus.survey.form.SurveyForm;

import com.mongodb.Block;

import br.org.mongodb.MongoGenericDao;

public class SurveyDao extends MongoGenericDao {

	private static final String COLLECTION_NAME = "surveys";

	public SurveyDao() {
		super(COLLECTION_NAME);
	}

	public List<SurveyForm> find() {
		ArrayList<SurveyForm> surveys = new ArrayList<SurveyForm>();
		list().forEach((Block<Document>) document -> {
			surveys.add(SurveyForm.deserialize(document.toJson()));
		});
		
		return surveys;
	}
	
	public List<SurveyForm> findByAcronym(String acronym) {
		ArrayList<SurveyForm> surveys = new ArrayList<SurveyForm>();
		collection.find(eq("template.identity.acronym", acronym)).forEach((Block<Document>) document -> {
			surveys.add(SurveyForm.deserialize(document.toJson()));
		});
		
		return surveys;
	}
	
}
