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
import br.org.otus.user.User;
import br.org.owail.sender.email.Email;
import br.org.owail.sender.email.Recipient;
import br.org.owail.sender.email.Sender;

@Ignore
public class OtusNewUserNotificationEmailTest {

    private final String SUBJECT = "Sistema Otus: Novo usuário";

    private Sender sender;
    private Recipient recipient;
    private User user;

    @Before
    public void setup() {
        sender = new Sender(anyString(), anyString(), anyString());
        recipient = Recipient.createTO("Recipient Name", "recipient@email.com");
        user = new User();
    }

    @Test
    public void createNewUserNotificationEmail_method_should_return_an_instance_of_NewUserNotificationEmail() {
        Object email = OtusEmailFactory.createNewUserNotificationEmail(sender, recipient, user);

        assertThat(email, instanceOf(NewUserNotificationEmail.class));
    }

    @Test
    public void createNewUserNotificationEmail_method_should_return_an_email_with_recipient_defined() {
        Email email = OtusEmailFactory.createNewUserNotificationEmail(sender, recipient, user);

        assertThat(email.getRecipients(), not(empty()));
    }

    @Test
    public void createNewUserNotificationEmail_method_should_return_an_email_with_from_defined() {
        Email email = OtusEmailFactory.createNewUserNotificationEmail(sender, recipient, user);

        assertThat(email.getFrom(), notNullValue());
    }

    public void createNewUserNotificationEmail_method_should_return_an_email_with_subject_defined() {
        Email email = OtusEmailFactory.createNewUserNotificationEmail(sender, recipient, user);

        assertThat(email.getSubject(), equalTo(SUBJECT));
    }

}
