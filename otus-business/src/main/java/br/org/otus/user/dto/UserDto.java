package br.org.otus.user.dto;

import br.org.otus.security.EncryptorResources;
import br.org.tutty.Equalization;

public class UserDto {

	@Equalization(name = "user_email")
	private String email;

	@Equalization(name = "user_password")
	private String password;

	private String passwordConfirm;

	public void encrypt() {
		this.setPassword(EncryptorResources.encrypt(getPassword()));
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPasswordConfirm() {
		return passwordConfirm;
	}

	public void setPasswordConfirm(String passwordConfirm) {
		this.passwordConfirm = passwordConfirm;
	}

}