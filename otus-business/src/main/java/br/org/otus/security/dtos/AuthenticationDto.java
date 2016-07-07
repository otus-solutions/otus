package br.org.otus.security.dtos;

import br.org.otus.rest.dtos.Dto;
import br.org.otus.security.EncryptorResources;
import br.org.tutty.Equalization;

public class AuthenticationDto implements Dto, AuthenticationData{

	@Equalization(name = "email")
	public String email;

	@Equalization(name = "password")
	public String password;

	private String issuer;
	
	public void encryptPassword() {
		this.password = EncryptorResources.encrypt(password);
	}

	@Override
	public String getKey() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getIssuer() {
		return issuer;
	}

	@Override
	public Boolean isValid() {
		return !email.isEmpty() && !password.isEmpty();
	}

	public void setIssuer(String issuer){
		this.issuer = issuer;
	}
}
