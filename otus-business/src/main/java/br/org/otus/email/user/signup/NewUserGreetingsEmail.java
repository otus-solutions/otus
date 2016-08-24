package br.org.otus.email.user.signup;

import br.org.otus.email.OtusEmail;
import br.org.owail.sender.email.Email;
import br.org.owail.sender.email.Mailer;
import br.org.owail.sender.email.Recipient;

import java.util.HashMap;
import java.util.Map;

public class NewUserGreetingsEmail extends Email implements OtusEmail {

    private final String TEMPLATE = "/template/user/signup/greetings-template.html";
    private final String SUBJECT = "Sistema Otus: Bem-vindo, ";

    private HashMap<String, String> dataMap;

    public NewUserGreetingsEmail(Recipient recipient) {
        buildDataMap(recipient);
        defineSubject(recipient.getName());
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

    private void defineSubject(String name) {
        setSubject(SUBJECT + name);
    }

    private void buildDataMap(Recipient recipient) {
        dataMap = new HashMap<String, String>();
        dataMap.put("name", recipient.getName());
    }

}
