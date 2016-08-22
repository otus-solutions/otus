package br.org.otus.email.service;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.email.OtusEmail;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.owail.sender.email.Sender;

public interface EmailNotifierService {

    void sendSystemInstallationEmail(OtusInitializationConfigDto otusInitializationData) throws EmailNotificationException, DataNotFoundException;

	Sender getSender() throws DataNotFoundException, EmailNotificationException;

	void sendEmail(OtusEmail email) throws EmailNotificationException;

    void sendEmailSync(OtusEmail email) throws EmailNotificationException;

}
