package br.org.otus.email.service;

import br.org.otus.email.EmailSender;
import br.org.otus.email.OtusEmail;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.owail.sender.email.Sender;

public interface EmailNotifierService {

	void sendEmail(OtusEmail email) throws EmailNotificationException;

	Sender getSender() throws DataNotFoundException;

	void sendWelcomeEmail(EmailSender emailSender) throws EmailNotificationException, DataNotFoundException;

}
