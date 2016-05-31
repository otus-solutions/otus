package br.org.otus.security;

import java.util.UUID;

public class OtusSecurity {
	
	private UUID uuid;
	
	public OtusSecurity(){
		this.uuid = UUID.randomUUID();
	}
	
	public UUID getUuid() {
		return uuid;
	}
}
