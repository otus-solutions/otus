package br.org.otus.email;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.instanceOf;
import static org.hamcrest.Matchers.not;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Matchers;
import org.mockito.Mock;

import br.org.owail.sender.email.Email;

public class OtusEmailFactoryTest {
    
    private OtusEmailFactory factory;
    
    @Mock
    private EmailSender recipient;
    
    @Before
    public void setup() {
        factory = new OtusEmailFactory();
        recipient = new BasicEmailSender();
    }
    
    @Test
    public void createSystemInstallationEmail_method_should_return_an_instance_of_SystemInstallationEmail() {
        Object email = factory.createSystemInstallationEmail(recipient);
        
        assertThat(email, instanceOf(SystemInstallationEmail.class));
    }
    
    @Test
    public void createSystemInstallationEmail_method_should_return_an_email_with_recipient_defined() {
        Email email = factory.createSystemInstallationEmail(recipient);
        
        assertThat(email.getRecipients(), not(empty()));
    }
    
    @Test
    public void createSystemInstallationEmail_method_should_return_an_email_with_from_defined() {
        Email email = factory.createSystemInstallationEmail(recipient);
        
        assertThat(email.getFrom(), Matchers.isNotNull()); 
    }

}
