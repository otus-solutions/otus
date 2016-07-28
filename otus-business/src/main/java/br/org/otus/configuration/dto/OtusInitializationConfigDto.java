package br.org.otus.configuration.dto;

import br.org.otus.domain.DomainDto;
import br.org.otus.email.dto.EmailSenderDto;
import br.org.otus.project.dto.ProjectDto;
import br.org.otus.user.dto.UserDto;

public class OtusInitializationConfigDto {

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

	public void setEmailSender(EmailSenderDto emailSender) {
		this.emailSender = emailSender;
	}

}
