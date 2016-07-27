
package br.org.otus.configuration.dto;

import br.org.otus.domain.DomainDto;
import br.org.otus.email.dto.EmailSenderDto;
import br.org.otus.project.dto.ProjectDto;
import br.org.otus.user.dto.UserDto;

public class OtusInitializationConfigDto {

	private EmailSenderDto emailSender;
	private UserDto user;
	private ProjectDto project;
	private DomainDto domain;

	public UserDto getUser() {
		return user;
	}

	public void setUser(UserDto user) {
		this.user = user;
	}

	public ProjectDto getProject() {
		return project;
	}

	public void setProject(ProjectDto project) {
		this.project = project;
	}

	public DomainDto getDomainDto() {
		return domain;
	}

	public void setDomainDto(DomainDto domainDto) {
		this.domain = domainDto;
	}

	public EmailSenderDto getEmailSender() {
		return emailSender;
	}

	public void setEmailSender(EmailSenderDto emailSender) {
		this.emailSender = emailSender;
	}

}
