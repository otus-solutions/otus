package br.org.otus.user.dto;

import br.org.otus.security.EncryptorResources;
import br.org.tutty.Equalization;

public class UserDto {

	@Equalization(name = "user_email")
	private String userEmail;

	@Equalization(name = "user_password")
	private String userPassword;

	public void encrypt() {
		this.setUserPassword(EncryptorResources.encrypt(getUserPassword()));
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

}