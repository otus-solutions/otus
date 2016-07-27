package br.org.otus.email;

import java.util.List;
import java.util.Map;

import br.org.owail.sender.email.Recipient;
import br.org.owail.sender.email.Sender;

public interface OtusEmail {

	String getTemplatePath();

    Sender getFrom();

    List<Recipient> getRecipients();

    String getSubject();

    Map<String, String> getContentDataMap();

    String getContentType();
    
}
