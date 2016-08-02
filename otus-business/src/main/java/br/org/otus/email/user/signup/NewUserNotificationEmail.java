package br.org.otus.email.user.signup;

import java.util.HashMap;
import java.util.Map;

import br.org.otus.email.OtusEmail;
import br.org.otus.user.User;
import br.org.owail.sender.email.Email;
import br.org.owail.sender.email.Mailer;
import br.org.owail.sender.email.Recipient;
import br.org.owail.sender.email.Sender;

public class NewUserNotificationEmail extends Email implements OtusEmail {

    private final String TEMPLATE = "/template/user/signup/notification-template.html";
    private final String SUBJECT = "Alerta - Novo usuário cadastrado no sistema Otus";
    private HashMap<String, String> dataMap;

    public NewUserNotificationEmail(Sender sender, Recipient recipient, User user) {
        buildDataMap(user);
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

    private void buildDataMap(User user) {
        dataMap = new HashMap<String, String>();
        dataMap.put("name", user.getName());
        dataMap.put("surname", user.getSurname());
        dataMap.put("mail", user.getEmail());
        dataMap.put("phone", user.getPhone());
    }

}
