package br.org.otus.email.user.signup;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.instanceOf;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.notNullValue;
import static org.mockito.Matchers.anyString;

import org.junit.Before;
import org.junit.Test;
import org.junit.Ignore;

import br.org.otus.email.OtusEmailFactory;
import br.org.owail.sender.email.Email;
import br.org.owail.sender.email.Recipient;
import br.org.owail.sender.email.Sender;

@Ignore
public class OtusNewUserGreetingsEmailTest {

    private final String SUBJECT = "Sistema Otus: Bem-vindo, ";

    private Sender sender;
    private Recipient recipient;

    @Before
    public void setup() {
        sender = new Sender(anyString(), anyString(), anyString());
        recipient = Recipient.createTO("Recipient Name", "recipient@email.com");
    }

    @Test
    public void createNewUserGreetingsEmail_method_should_return_an_instance_of_NewUserGreetingsEmail() {
        Object email = OtusEmailFactory.createNewUserGreetingsEmail(sender, recipient);

        assertThat(email, instanceOf(NewUserGreetingsEmail.class));
    }

    @Test
    public void createNewUserGreetingsEmail_method_should_return_an_email_with_recipient_defined() {
        Email email = OtusEmailFactory.createNewUserGreetingsEmail(sender, recipient);

        assertThat(email.getRecipients(), not(empty()));
    }

    @Test
    public void createNewUserGreetingsEmail_method_should_return_an_email_with_from_defined() {
        Email email = OtusEmailFactory.createNewUserGreetingsEmail(sender, recipient);

        assertThat(email.getFrom(), notNullValue());
    }

    public void createNewUserGreetingsEmail_method_should_return_an_email_with_subject_defined() {
        Email email = OtusEmailFactory.createNewUserGreetingsEmail(sender, recipient);

        assertThat(email.getSubject(), equalTo(SUBJECT));
    }

}
