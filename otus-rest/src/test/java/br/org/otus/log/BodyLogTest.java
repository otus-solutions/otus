package br.org.otus.log;

import com.google.gson.Gson;
import org.junit.Assert;
import org.junit.Test;

public class BodyLogTest {
    private static String PASSWORD_MASK = "{\"password\":\"XXXXXXXXXXXXXXXX\"}";
    private static String PASSWORD_CONFIRMATION_MASK = "{\"passwordConfirmation\":\"XXXXXXXXXXXXXXXX\"}";
    private static String PWD_MASK = "{\"pwd\":\"XXXXXXXXXXXXXXXX\"}";

    @Test
    public void method_getBody_should_mask_sensitive_data_password(){
        BodyLog bodyLog = new BodyLog(new Gson().toJson(new DummyPasswordBody()));
        String body = bodyLog.getBody();
        Assert.assertEquals(PASSWORD_MASK, body);
    }

    @Test
    public void method_getBody_should_mask_sensitive_data_passwordConfirmation(){
        BodyLog bodyLog = new BodyLog(new Gson().toJson(new DummyPasswordConfirmationBody()));
        String body = bodyLog.getBody();
        Assert.assertEquals(PASSWORD_CONFIRMATION_MASK, body);
    }

    @Test
    public void method_getBody_should_mask_sensitive_data_pwd(){
        BodyLog bodyLog = new BodyLog(new Gson().toJson(new DummyPwdBody()));
        String body = bodyLog.getBody();
        Assert.assertEquals(PWD_MASK, body);
    }

    class DummyPasswordBody{
        public String password = "Teste123";
    }

    class DummyPasswordConfirmationBody{
        public String passwordConfirmation = "Teste123";
    }

    class DummyPwdBody{
        public String pwd = "Teste123";
    }
}
