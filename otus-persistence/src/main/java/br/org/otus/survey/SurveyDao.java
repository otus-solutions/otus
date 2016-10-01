package br.org.otus.survey;

import br.org.mongodb.MongoGenericDao;
import com.mongodb.Block;
import org.bson.Document;
import org.ccem.otus.survey.form.SurveyForm;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.in;
import static com.mongodb.client.model.Filters.or;

public class SurveyDao extends MongoGenericDao {

    private static final String COLLECTION_NAME = "Surveys";

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
        ArrayList<SurveyForm> surveys = new ArrayList<>();
        collection.find(eq("surveyTemplate.identity.acronym", acronym)).forEach((Block<Document>) document -> {
            surveys.add(SurveyForm.deserialize(document.toJson()));
        });

        return surveys;
    }

    public List<SurveyForm> findByCustomId(Set<String> ids) {
        ArrayList<SurveyForm> surveys = new ArrayList<>();
        collection.find(
                or(
                        in("surveyTemplate.itemContainer.customID", ids),
                        in("surveyTemplate.itemContainer.options.customOptionID", ids)
                )
        ).forEach((Block<Document>) document -> {
            surveys.add(SurveyForm.deserialize(document.toJson()));
        });

        return surveys;

    }

}
