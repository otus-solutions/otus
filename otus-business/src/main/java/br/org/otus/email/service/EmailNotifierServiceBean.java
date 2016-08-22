package br.org.otus.email.service;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import javax.ejb.Asynchronous;
import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.email.BasicEmailSender;
import br.org.otus.email.OtusEmail;
import br.org.otus.email.OtusEmailFactory;
import br.org.otus.email.system.SystemInstallationEmail;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.security.EncryptorResources;
import br.org.otus.system.SystemConfigDao;
import br.org.owail.io.TemplateReader;
import br.org.owail.sender.email.Recipient;
import br.org.owail.sender.email.Sender;
import br.org.owail.sender.gmail.GMailer;
import br.org.tutty.Equalizer;

@Stateless
@Local(EmailNotifierService.class)
public class EmailNotifierServiceBean implements EmailNotifierService {

    @Inject
    private SystemConfigDao systemConfigDao;

    @Override
    public void sendSystemInstallationEmail(OtusInitializationConfigDto initializationData) throws EmailNotificationException {
        try {
            BasicEmailSender emailSenderDto = new BasicEmailSender();
            Equalizer.equalize(initializationData.getEmailSender(), emailSenderDto);
            Recipient recipient = Recipient.createTO(initializationData.getUser().getName(), initializationData.getUser().getEmail());
            Sender sender = new Sender(emailSenderDto.getName(), emailSenderDto.getEmail(), EncryptorResources.decrypt(emailSenderDto.getPassword()));
            SystemInstallationEmail email = OtusEmailFactory.createSystemInstallationEmail(sender, recipient);
            sendEmail(email);
        }catch (UnsupportedEncodingException e) {
            throw new EmailNotificationException();
        }
    }
    
    @Override
    @Asynchronous
    public void sendEmail(OtusEmail email) throws EmailNotificationException {
        sendEmailSync(email);
    }
    
    @Override
    public void sendEmailSync(OtusEmail email) throws EmailNotificationException {
        GMailer mailer = GMailer.createTLSMailer();

        mailer.setFrom(email.getFrom());
        mailer.addRecipients(email.getRecipients());
        mailer.setSubject(email.getSubject());
        mailer.setContentType(email.getContentType());
        mailer.setContent(mergeTemplate(email.getContentDataMap(), email.getTemplatePath()));

        try {
            mailer.send();
        } catch (Exception e) {
            throw new EmailNotificationException(e);
        }
    }

    @Override
    public Sender getSender() throws DataNotFoundException, EmailNotificationException {
        BasicEmailSender emailSender = systemConfigDao.findEmailSender();
        try {
            return new Sender(emailSender.getName(), emailSender.getEmail(), EncryptorResources.decrypt(emailSender.getPassword()));

        } catch (UnsupportedEncodingException e) {
            throw new EmailNotificationException(e);
        }
    }

    private String mergeTemplate(Map<String, String> dataMap, String template) {
        TemplateReader templateReader = new TemplateReader();
        String templateContent = templateReader.getFileToString(getClass().getClassLoader(), template);
        return templateReader.fillTemplate(dataMap, templateContent);
    }

}
