package br.org.otus.rest;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;

import com.google.gson.Gson;

public class ResponseTest {

	private OtusInitializationConfigDto otusInitConfig;

	@Before
	public void setup() {
		otusInitConfig = new OtusInitializationConfigDto();
		//otusInitConfig.setDomain("domain_rest_url");
		//otusInitConfig.setProjectName("project_name");
	}

	@Test
	public void toString_should_return_a_json_with_value_of_data_equal_to_true() {
		Response response = new Response();
		response.setData(true);

		Gson gson = new Gson();
		Response generatedJson = gson.fromJson(new Gson().toJson(response), Response.class);
		Assert.assertEquals(generatedJson.getData(), Boolean.TRUE);
	}
	
	
	@Test
	public void test_if_generatedJson_get_return_to_expected_otusInitConfig() {
		Response response = new Response();
		response.setData(otusInitConfig);
		
		Gson gson = new Gson();
		OtusInitializationConfigDto generatedJson = gson.fromJson(new Gson().toJson(response.getData()), OtusInitializationConfigDto.class);
		
		//Assert.assertEquals(generatedJson.getDomainRestUrl(), otusInitConfig.getDomainRestUrl());
		//Assert.assertEquals(generatedJson.getProjectName(), otusInitConfig.getProjectName());
	
	}
	
}
