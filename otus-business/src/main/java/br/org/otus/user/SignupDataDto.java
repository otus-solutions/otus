package br.org.otus.user;

import br.org.tutty.Equalization;

public class SignupDataDto {

	@Equalization(name = "name")
	private String name;

	@Equalization(name = "surname")
	private String surname;

	@Equalization(name = "cell_number")
	private String cellNumber;

	@Equalization(name = "email")
	private String email;

	@Equalization(name = "password")
	private String password;

	@Equalization(name = "password_confirmation")
	private String passwordConfirmation;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getCellNumber() {
		return cellNumber;
	}

	public void setCellNumber(String cellNumber) {
		this.cellNumber = cellNumber;
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

	public String getPasswordConfirmation() {
		return passwordConfirmation;
	}

	public void setPasswordConfirmation(String passwordConfirmation) {
		this.passwordConfirmation = passwordConfirmation;
	}

}
