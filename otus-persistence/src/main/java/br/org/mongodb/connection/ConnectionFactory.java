package br.org.mongodb.connection;

import java.util.Arrays;

import javax.ejb.Stateless;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;

import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

@Stateless
public class ConnectionFactory extends ConnectionConfiguration {

	@ApplicationScoped
	@Produces
	public MongoClient mongoClient() {
		MongoCredential credential = MongoCredential.createCredential(username, database, password.toCharArray());
		ServerAddress serverAddress = new ServerAddress(host, port);

		return new MongoClient(serverAddress, Arrays.asList(credential));
	}

}
