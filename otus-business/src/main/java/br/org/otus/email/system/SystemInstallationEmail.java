package br.org.otus.email.system;

import br.org.otus.email.OtusEmail;
import br.org.owail.sender.email.Email;
import br.org.owail.sender.email.Mailer;
import br.org.owail.sender.email.Recipient;
import br.org.owail.sender.email.Sender;

import java.util.HashMap;
import java.util.Map;

public class SystemInstallationEmail extends Email implements OtusEmail {

    private final String TEMPLATE = "/template/system/installation-template.html";
    private final String SUBJECT = "Sistema Otus: Instalação bem sucedida";

    private HashMap<String, String> dataMap;

    public SystemInstallationEmail(Sender sender, Recipient recipient) {
        buildDataMap();
        defineSubject();
        defineRecipient(recipient.getEmailAddress());
    }

    @Override
    public String getTemplatePath() {
        return TEMPLATE;
    }

    @Override
    public Map<String, String> getContentDataMap() {
        return dataMap;
    }

    @Override
    public String getContentType() {
        return Mailer.HTML;
    }

    public void defineRecipient(String email) {
        addTORecipient("recipient", email);
    }

    private void defineSubject() {
        setSubject(SUBJECT);
    }

    private void buildDataMap() {
        dataMap = new HashMap<String, String>();
    }

}
