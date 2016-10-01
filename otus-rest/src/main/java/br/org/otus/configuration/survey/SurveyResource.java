package br.org.otus.configuration.survey;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import br.org.otus.rest.Response;
import br.org.otus.security.Secured;
import br.org.otus.survey.api.SurveyFacade;

@Path("configuration/surveys")
public class SurveyResource {

    @Inject
    private SurveyFacade surveyFacade;

    @GET
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    public String getAll() {
        return new Response().buildSuccess(surveyFacade.list()).toJson();
    }

    @GET
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    public String getByAcronym(@QueryParam("acronym") String acronym) {
        return new Response().buildSuccess(surveyFacade.findByAcronym(acronym)).toJson();
    }

    @PUT
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    public String updateSurveyFormTypeByTemplateOID(String updateData) {
        // TODO update surveyFormType
        return null;
    }

}
