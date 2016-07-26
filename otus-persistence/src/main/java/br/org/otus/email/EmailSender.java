package br.org.otus.email;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Type;

import br.org.tutty.Equalization;

@Entity
public class EmailSender {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Type(type = "objectid")
	private String id;

	@Equalization(name = "name")
	@NotNull
	private String name;

	@Equalization(name = "email")
	@NotNull
	private String emailAddress;

	@Equalization(name = "password")
	@NotNull
	private String password;

	public EmailSender() {
	}

	public EmailSender(String name, String emailAddress, String password) {
		super();
		this.name = name;
		this.emailAddress = emailAddress;
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public String getPassword() {
		return password;
	}

}
