package br.org.otus.email;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.instanceOf;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.whenNew;

import javax.mail.MessagingException;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.email.dto.EmailSenderDto;
import br.org.otus.email.service.EmailNotifierServiceBean;
import br.org.otus.email.system.SystemInstallationEmail;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.system.SystemConfigDao;
import br.org.otus.user.dto.UserDto;
import br.org.owail.io.TemplateReader;
import br.org.owail.sender.email.EmailCompositionException;
import br.org.owail.sender.email.Recipient;
import br.org.owail.sender.email.Sender;
import br.org.owail.sender.gmail.GMailer;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ EmailNotifierServiceBean.class, GMailer.class, OtusEmailFactory.class, Recipient.class })
public class EmailNotifierServiceTest {

    @InjectMocks
    private EmailNotifierServiceBean service;

    @Mock
    private SystemConfigDao systemConfigDao;
    @Mock
    private BasicEmailSender emailSender;
    @Mock
    private EmailSenderDto emailSenderDto;
    @Mock
    private GMailer gmailer;
    @Mock
    private OtusEmail email;
    @Mock
    private TemplateReader templateReader;
    @Mock
    private Sender sender;
    @Mock
    private Recipient recipient;
    @Mock
    private SystemInstallationEmail installationEmail;
    @Mock
    private OtusInitializationConfigDto initializationData;
    @Mock
    private UserDto user;

    @Before
    public void setup() throws Exception {
        when(initializationData.getUser()).thenReturn(user);

        mockStatic(GMailer.class);
        when(GMailer.createTLSMailer()).thenReturn(gmailer);

        whenNew(TemplateReader.class).withNoArguments().thenReturn(templateReader);
    }

    @Test
    public void getSender_method_should_return_the_system_email_sender() throws DataNotFoundException {
        when(systemConfigDao.findEmailSender()).thenReturn(emailSender);

        Object sender = service.getSender();

        assertThat(sender, instanceOf(Sender.class));
    }

    @Test
    public void sendEmail_method_should_configure_a_GMail_object() throws EmailNotificationException {
        service.sendEmail(email);

        verify(gmailer).setFrom(email.getFrom());
        verify(gmailer).addRecipients(email.getRecipients());
        verify(gmailer).setSubject(email.getSubject());
        verify(gmailer).setContentType(email.getContentType());
    }

    @Test
    public void sendEmail_method_should_send_an_email() throws EmailNotificationException, EmailCompositionException, MessagingException {
        service.sendEmail(email);

        verify(gmailer).send();
    }

    @Test
    public void sendSystemInstallationEmail_method_should_send_an_SystemInstallationEmail() throws Exception {
        when(initializationData.getEmailSender()).thenReturn(emailSenderDto);

        whenNew(Sender.class).withArguments(Mockito.anyString(), Mockito.anyString(), Mockito.anyString()).thenReturn(sender);

        mockStatic(Recipient.class);
        when(Recipient.createTO(Mockito.anyString(), Mockito.anyString())).thenReturn(recipient);

        mockStatic(OtusEmailFactory.class);
        when(OtusEmailFactory.createSystemInstallationEmail(sender, recipient)).thenReturn(installationEmail);

        service.sendSystemInstallationEmail(initializationData);

        PowerMockito.verifyStatic();
        OtusEmailFactory.createSystemInstallationEmail(sender, recipient);
    }

}
