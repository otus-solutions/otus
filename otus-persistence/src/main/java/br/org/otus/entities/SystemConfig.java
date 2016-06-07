package br.org.otus.entities;

import java.util.UUID;

import br.org.tutty.Equalization;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


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
    
    private UUID uuid;
    
    public SystemConfig(){
    	this.uuid = UUID.randomUUID();
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
   	
   	public String getDomainRestUrl(){
   		return domainRestUrl;
   	}

}
