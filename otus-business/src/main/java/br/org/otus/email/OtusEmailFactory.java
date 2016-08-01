package br.org.otus.email;

import br.org.owail.sender.email.Email;

public class OtusEmailFactory {

    public Email createSystemInstallationEmail(EmailSender recipient) {
        SystemInstallationEmail email = new SystemInstallationEmail();
        
        email.defineRecipient(recipient.getEmail());
        
        return email;
    }

}
