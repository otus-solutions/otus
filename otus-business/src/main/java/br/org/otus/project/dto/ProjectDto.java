package br.org.otus.project.dto;

import br.org.tutty.Equalization;

public class ProjectDto {

	@Equalization(name = "project_name")
	private String projectName;

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

}
