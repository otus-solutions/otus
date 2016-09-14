package br.org.otus.rest;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import com.google.gson.Gson;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class ResponseTest {

    private OtusInitializationConfigDto otusInitConfig;

    @Before
    public void setup() {
        otusInitConfig = new OtusInitializationConfigDto();
    }

    @Test
    public void toString_should_return_a_json_with_value_of_data_equal_to_true() {
        Response response = new Response();
        response.setData(true);

        Gson gson = new Gson();
        Response generatedJson = gson.fromJson(new Gson().toJson(response), Response.class);
        Assert.assertEquals(generatedJson.getData(), Boolean.TRUE);
    }
}
