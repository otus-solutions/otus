package br.org.otus.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Type;

import br.org.tutty.Equalization;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Type(type = "objectid")
	private String id;

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

	@Equalization(name = "enable")
	private Boolean isEnable;

	protected User() {
		isEnable = false;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getSurname() {
		return surname;
	}

	public String getCellNumber() {
		return cellNumber;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public Boolean isEnable() {
		return isEnable;
	}

}
