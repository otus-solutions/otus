package br.org.otus.domain.exceptions;

public class DomainConnectionError extends Exception{

	private static final long serialVersionUID = -3604477637651372672L;

	public DomainConnectionError(Throwable cause) {
        super(cause);
    }
}
