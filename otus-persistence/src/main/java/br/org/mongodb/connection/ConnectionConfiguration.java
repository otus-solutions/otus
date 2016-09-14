package br.org.mongodb.connection;

import java.util.Map;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public abstract class ConnectionConfiguration {

	private static final String PERSISTENCE_UNIT = "OtusMongo";
	
	protected String username;
	protected String password;
	protected String database;
	protected String host;
	protected int port;
	
	public ConnectionConfiguration() {
		EntityManagerFactory factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT);
		Map<String, Object> properties = factory.getProperties();
		username = (String) properties.get("hibernate.ogm.datastore.username");
		password = (String) properties.get("hibernate.ogm.datastore.password");
		database = (String) properties.get("hibernate.ogm.datastore.database");
		host = (String) properties.get("hibernate.ogm.datastore.host");
		port = Integer.valueOf((String) properties.get("hibernate.ogm.datastore.port")).intValue();
	}

}
