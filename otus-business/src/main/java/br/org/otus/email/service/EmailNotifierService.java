package br.org.otus.email.service;

import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.email.OtusEmail;
import br.org.otus.exceptions.webservice.common.DataNotFoundException;
import br.org.otus.exceptions.webservice.http.EmailNotificationException;
import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.owail.sender.email.Sender;

public interface EmailNotifierService {

    void sendSystemInstallationEmail(OtusInitializationConfigDto otusInitializationData) throws EmailNotificationException, EncryptedException;

	Sender getSender() throws EncryptedException, DataNotFoundException;

	void sendEmail(OtusEmail email) throws EmailNotificationException;

    void sendEmailSync(OtusEmail email) throws EmailNotificationException;

}
