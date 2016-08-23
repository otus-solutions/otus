package br.org.otus.system;

import javax.persistence.*;

import org.hibernate.annotations.Type;

import br.org.otus.email.BasicEmailSender;
import br.org.tutty.Equalization;

@Entity
public class SystemConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Type(type = "objectid")
    private String id;

    @Equalization(name = "project_name")
    private String projectName;

    @Equalization(name = "domain_rest_url")
    private String domainRestUrl;

    @Equalization(name = "project_token")
    private String projectToken;

    @Embedded
    private BasicEmailSender basicEmailSender;

    public SystemConfig() {
        basicEmailSender = new BasicEmailSender();
    }

    public void setProjectToken(String projectToken) {
        this.projectToken = projectToken;
    }

    public String getProjectToken() {
        return projectToken;
    }

    public String getId() {
        return id;
    }

    public String getProjectName() {
        return projectName;
    }

    public String getDomainRestUrl() {
        return domainRestUrl;
    }

    public BasicEmailSender getEmailSender() {
        return basicEmailSender;
    }

}
