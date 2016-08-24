package br.org.otus.configuration.dto;

import br.org.otus.email.dto.EmailSenderDto;
import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.project.dto.ProjectDto;
import br.org.otus.rest.dtos.Dto;
import br.org.otus.user.dto.UserDto;

public class OtusInitializationConfigDto implements Dto {

	private UserDto user;
	private EmailSenderDto emailSender;
	private ProjectDto project;
	private DomainDto domain;

	public UserDto getUser() {
		return user;
	}

	public ProjectDto getProject() {
		return project;
	}

	public DomainDto getDomainDto() {
		return domain;
	}

	public EmailSenderDto getEmailSender() {
		return emailSender;
	}

	@Override
	public Boolean isValid() {
		return Boolean.TRUE;
	}

	@Override
	public void encrypt() throws EncryptedException {
		emailSender.encrypt();
		user.encrypt();
	}
}
