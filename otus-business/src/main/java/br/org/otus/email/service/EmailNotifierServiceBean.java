package br.org.otus.email.service;

import java.util.Map;

import javax.ejb.Asynchronous;
import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.otus.email.BasicEmailSender;
import br.org.otus.email.EmailSender;
import br.org.otus.email.OtusEmail;
import br.org.otus.email.SystemInstallationEmail;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.system.SystemConfigDao;
import br.org.owail.io.TemplateReader;
import br.org.owail.sender.email.Sender;
import br.org.owail.sender.gmail.GMailer;

@Stateless
@Local(EmailNotifierService.class)
public class EmailNotifierServiceBean implements EmailNotifierService {

	@Inject
	private SystemConfigDao systemConfigDao;

	@Override
	@Asynchronous
	public void sendEmail(OtusEmail email) throws EmailNotificationException {
		GMailer mailer = GMailer.createTLSMailer();

		mailer.setFrom(email.getFrom());
		mailer.addRecipients(email.getRecipients());
		mailer.setSubject(email.getSubject());
		mailer.setContentType(email.getContentType());
		mailer.setContent(mergeTemplate(email.getContentDataMap(), email.getTemplatePath()));

		try {
			mailer.send();
		} catch (Exception e) {
			e.printStackTrace();
			throw new EmailNotificationException(e);
		}
	}

	@Override
	public Sender getSender() throws DataNotFoundException {
		BasicEmailSender emailSender = systemConfigDao.findEmailSender();
		return new Sender(emailSender.getName(), emailSender.getEmail(), emailSender.getPassword());
	}

	@Override
	public void sendWelcomeEmail(EmailSender emailSender) throws EmailNotificationException, DataNotFoundException {
		Sender sender = new Sender(emailSender.getName(), emailSender.getEmail(), emailSender.getPassword());

		SystemInstallationEmail welcomeNotificationEmail = new SystemInstallationEmail();
		welcomeNotificationEmail.defineRecipient(emailSender.getEmail());
		welcomeNotificationEmail.setFrom(sender);
		sendEmail(welcomeNotificationEmail);
	}

	private String mergeTemplate(Map<String, String> dataMap, String template) {
		TemplateReader templateReader = new TemplateReader();
		String templateContent = templateReader.getFileToString(getClass().getClassLoader(), template);
		return templateReader.fillTemplate(dataMap, templateContent);
	}

}
