package br.org.mongodb;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.bson.Document;

import com.google.gson.JsonObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@Stateless
public class MongoClientEM {
	
	@Inject
	private MongoClient mongoClient;
	
	public void persist(String collectionName, JsonObject jsonObject) {
		
		// Get otus DB
		MongoDatabase db = mongoClient.getDatabase("otus");
		
		// Get survey Collection
		MongoCollection<Document> collection = db.getCollection(collectionName);
		
		// Insert a document on survey collection
		collection.insertOne(Document.parse(jsonObject.toString()));
	}

}
