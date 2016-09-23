package br.org.otus.survey;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.ccem.otus.survey.Survey;
import org.ccem.otus.template.Template;

import br.org.otus.rest.Response;
import br.org.otus.survey.api.SurveyFacade;

@Path("/surveys")
public class SurveyResource {

	@Inject
	private SurveyFacade surveyFacade;

	@POST
	public String post(String template) {
		Template surveyTemplate = Template.deserialize(template);
		
		Survey s = new Survey();
		s.templateType = "perfil";
		s.sender = "brenoscheffer@gmail.com";
		s.sendingDate = "20/12/2016";
		s.template  = surveyTemplate;
		
		surveyFacade.saveSurvey(s);
		
		return new Response().buildSuccess().toJson();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String get() {
		return new Response().buildSuccess(surveyFacade.list()).toJson();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getByAcronym(@QueryParam("acronym") String acronym) {
		return new Response().buildSuccess(surveyFacade.findByAcronym(acronym)).toJson();
	}

}
