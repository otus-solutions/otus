package br.org.otus.rest;

import java.util.HashSet;
import java.util.Set;

import javax.inject.Inject;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import br.org.otus.configuration.publish.TemplateResource;
import br.org.otus.configuration.survey.SurveyResource;
import br.org.otus.configuration.visual.VisualIdentityResource;
import br.org.otus.fieldCenter.FieldCenterResource;
import br.org.otus.security.rest.AuthenticationResource;
import br.org.otus.settings.InstallerResource;
import br.org.otus.user.UserResource;

@ApplicationPath("otus")
public class EndPointsLoader extends Application {

	@Inject
	private InstallerResource installerResource;

	@Inject
	private AuthenticationResource authenticationResource;

	@Inject
	private FieldCenterResource fieldCenterResource;

	@Inject
	private UserResource userResource;

	@Inject
	private SurveyResource surveyResource;
	
	@Inject
	private TemplateResource templateResource;

	@Inject
	private VisualIdentityResource visualIdentityResource;
	

	@Override
	public Set<Class<?>> getClasses() {
		Set<Class<?>> resources = new HashSet<Class<?>>();
		resources.add(InstallerResource.class);
		resources.add(AuthenticationResource.class);
		resources.add(FieldCenterResource.class);
		resources.add(UserResource.class);
		resources.add(SurveyResource.class);
		resources.add(TemplateResource.class);
		resources.add(VisualIdentityResource.class);
		return resources;
	}

	@Override
	public Set<Object> getSingletons() {
		Set<Object> resources = new HashSet<Object>();
		resources.add(installerResource);
		resources.add(authenticationResource);
		resources.add(fieldCenterResource);
		resources.add(userResource);
		resources.add(surveyResource);
		resources.add(templateResource);
		resources.add(visualIdentityResource);
		return resources;
	}
}
