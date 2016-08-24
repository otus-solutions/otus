package br.org.otus.security.dtos;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.rest.dtos.Dto;
import br.org.otus.security.EncryptorResources;
import br.org.tutty.Equalization;

public class AuthenticationDto implements Dto, AuthenticationData{

	@Equalization(name = "email")
	public String email;

	@Equalization(name = "password")
	public String password;

	private String issuer;
	
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

	@Override
	public void encrypt() throws EncryptedException {
		this.password = EncryptorResources.encryptIrreversible(password);
	}

	public void setIssuer(String issuer){
		this.issuer = issuer;
	}
}
