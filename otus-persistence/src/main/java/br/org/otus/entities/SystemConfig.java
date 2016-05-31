package br.org.otus.entities;

import java.util.UUID;

import br.org.tutty.Equalization;

import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by drferreira on 30/05/16.
 */
@Entity
public class SystemConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Type(type = "objectid")
    private String id;

    @Equalization(name = "project_name")
    private String projectName;

    @Equalization(name = "domain_url")
    private String domainUrl;
    
    private UUID uuid;
    
    public SystemConfig(){
    	this.uuid = UUID.randomUUID();
    	this.id = id;
    	this.projectName = projectName;
    	this.domainUrl = domainUrl;
    }
	
   	public UUID getUuid() {
   		return uuid;
   	}
   	
   	public String getId() {
   		return id;
   	}
   	
   	public String getProjectName(){
   		return projectName;
   	}
   	
   	public String getDomainUrl(){
   		return domainUrl;
   	}

}
