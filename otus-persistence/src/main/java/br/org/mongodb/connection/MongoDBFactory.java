package br.org.mongodb.connection;

import java.util.Arrays;

import javax.ejb.Stateless;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;

import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoDatabase;

@Stateless
public class MongoDBFactory extends ConnectionConfiguration {

	@ApplicationScoped
	@Produces
	public MongoDatabase getMongoDB() {
		MongoCredential credential = MongoCredential.createCredential(username, database, password.toCharArray());
		ServerAddress serverAddress = new ServerAddress(host, port);

		return new MongoClient(serverAddress, Arrays.asList(credential)).getDatabase(database);
	}

}
