package br.org.otus.rest;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import br.org.otus.rest.dtos.OtusInitializationConfigDto;

public class ResponseTest {

	// TODO

	private OtusInitializationConfigDto otusInitConfig;

	@Before
	public void setup() {
		otusInitConfig = new OtusInitializationConfigDto();
		otusInitConfig.setDomainRestUrl("domainRestUrl");
		otusInitConfig.setProjectName("projectName");
	}

	@Test
	public void toString_should_return_a_json_with_value_of_data_equal_to_true() {
		Response response = new Response();
		response.setData(true);

		Gson gson = new Gson();
		Response generatedJson = gson.fromJson(new Gson().toJson(response), Response.class);

	}
}
