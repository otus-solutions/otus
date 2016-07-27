package br.org.otus.email;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.isEmptyString;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.notNullValue;

import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class BasicEmailSenderTest {

    private static final String SENDER_PWD = "sender_pwd";
    private static final String SENDER_EMAIL = "sender@email.com";
    private static final String SENDER_NAME = "Sender Name";
    
    private BasicEmailSender emailSender;

    @Before
    public void setup() {
        emailSender = new BasicEmailSender(SENDER_NAME, SENDER_EMAIL, SENDER_PWD);
    }
    
    @Test
    public void an_BasicEmailSender_object_should_implements_BasicEmailSender_interface() {
        assertThat(emailSender, Matchers.instanceOf(EmailSender.class));
    }
    
    @Test
    public void a_new_BasicEmailSender_object_should_have_the_values_passed_on_constructor() {
        assertThat(emailSender.getName(), equalTo(SENDER_NAME));
        assertThat(emailSender.getEmail(), equalTo(SENDER_EMAIL));
        assertThat(emailSender.getPassword(), equalTo(SENDER_PWD));
    }

    @Test
    public void a_new_BasicEmailSender_object_should_have_a_name() {
        assertThat(emailSender.getName(), notNullValue());
        assertThat(emailSender.getName(), not(isEmptyString()));
    }

    @Test
    public void a_new_BasicEmailSender_object_should_have_a_email_address() {
        assertThat(emailSender.getEmail(), notNullValue());
        assertThat(emailSender.getEmail(), not(isEmptyString()));
    }

    @Test
    public void a_new_BasicEmailSender_object_should_have_a_password() {
        assertThat(emailSender.getPassword(), notNullValue());
        assertThat(emailSender.getPassword(), not(isEmptyString()));
    }

}
