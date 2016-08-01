package br.org.otus.email;

import java.util.HashMap;
import java.util.Map;

import br.org.owail.sender.email.Email;
import br.org.owail.sender.email.Mailer;

public class WelcomeUserNotificationEmail extends Email implements OtusEmail {

	private final String TEMPLATE = "/template/welcome-notification-template.html";
	private final String SUBJECT = "Seja Bem Vindo ao Sistema Otus";
	private HashMap<String, String> dataMap;

	public WelcomeUserNotificationEmail() {
		buildDataMap();
		defineSubject();
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

	public void defineRecipient(String email){
		addTORecipient("recipient", email);
	}

    private void defineSubject(){
    	setSubject(SUBJECT);
    }

    private void buildDataMap(){
    	dataMap = new HashMap<String, String>();
    }

}
