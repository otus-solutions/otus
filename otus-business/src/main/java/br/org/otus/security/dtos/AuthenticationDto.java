package br.org.otus.security.dtos;

import br.org.otus.rest.dtos.Dto;
import br.org.otus.security.EncryptorResources;
import br.org.tutty.Equalization;

public class AuthenticationDto implements Dto{

	@Equalization(name = "email")
	public String email;

	@Equalization(name = "password")
	public String password;

	private String issuer;
	
	public AuthenticationDto(String email, String password, String issuer) {
		super();
		this.email = email;
		this.password = password;
		this.issuer = issuer;
	}

	public AuthenticationDto() {}

	public void encryptPassword() {
		this.password = EncryptorResources.encrypt(password);
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}
	
	public String getIssuer() {
		return issuer;
	}

	public void setIssuer(String issuer){
		this.issuer = issuer;
	}

	@Override
	public Boolean isValid() {
		return !email.isEmpty() && !password.isEmpty();
	}
}
