package br.org.otus.user;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Type;

import br.org.tutty.Equalization;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Type(type = "objectid")
	private String id;

	@Equalization(name = "uuid")
	@NotNull
	private UUID uuid;

	@Equalization(name = "admin_flag")
	@NotNull
	private Boolean adm;

	@Equalization(name = "enable")
	private Boolean enable;

	@Equalization(name = "name")
	private String name;

	@Equalization(name = "surname")
	private String surname;

	@Equalization(name = "phone")
	private String phone;

	@Equalization(name = "email")
	private String email;

	@Equalization(name = "password")
	private String password;

	@Equalization(name = "code")
	private Integer code;

	public User() {
		this.uuid = UUID.randomUUID();
		this.adm = Boolean.FALSE;
		this.enable = Boolean.FALSE;
	}

	public void enable() {
		this.enable = Boolean.TRUE;
	}

	public void disable() {
		this.enable = Boolean.FALSE;
	}

	public void becomesAdm() {
		this.adm = Boolean.TRUE;
		enable();
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

	public String getPhone() {
		return phone;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public Boolean isEnable() {
		return enable;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

}
