package br.org.otus.exceptions;

public class EncryptedException extends RuntimeException{
	
	private static final long serialVersionUID = 370992029611632648L;

	public EncryptedException(Exception cause) {
	        super(cause);
	    }

}
