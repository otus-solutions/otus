package br.org.otus.email.service;

import br.org.otus.email.StudioEmail;
import br.org.otus.email.dto.EmailSenderDto;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.owail.sender.email.Sender;

public interface EmailNotifierService {

    void sendEmail(StudioEmail email) throws EmailNotificationException, DataNotFoundException;

    Sender getSender() throws DataNotFoundException;

    void sendWelcomeEmail(EmailSenderDto emailSenderDto) throws EmailNotificationException, DataNotFoundException;
}
