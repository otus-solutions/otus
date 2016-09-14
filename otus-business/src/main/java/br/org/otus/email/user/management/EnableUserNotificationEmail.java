package br.org.otus.email.user.management;

import br.org.otus.email.OtusEmail;
import br.org.otus.user.User;
import br.org.owail.sender.email.Email;
import br.org.owail.sender.email.Mailer;

import java.util.HashMap;
import java.util.Map;

public class EnableUserNotificationEmail extends Email implements OtusEmail {

	private final String TEMPLATE = "/template/user/management/enable-user-notification-template.html";
	private final String SUBJECT = "Alerta - Cadastro habilitado Otus";
	private Map<String, String> dataMap;

	public EnableUserNotificationEmail() {
		dataMap = new HashMap<>();
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

	public void defineRecipient(User user) {
		addTORecipient("recipient", user.getEmail());
	}

	private void defineSubject() {
		setSubject(SUBJECT);
	}

}
