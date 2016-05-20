package br.org.otus.rest;

import java.util.HashSet;
import java.util.Set;

import javax.inject.Inject;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("otus")
public class EndPointsLoader extends Application {

	@Inject
	private InstallerResource installerResource;
	
	@Override
	public Set<Class<?>> getClasses() {
		Set<Class<?>> resources = new HashSet<Class<?>>();
		resources.add(InstallerResource.class);
		return resources;
	}
	
	@Override
	public Set<Object> getSingletons() {
		Set<Object> resources = new HashSet<Object>();
		resources.add(installerResource);
		return resources;
	}
}
