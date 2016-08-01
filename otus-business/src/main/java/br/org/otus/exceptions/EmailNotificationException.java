package br.org.otus.exceptions;

public class EmailNotificationException extends Exception implements ResponseError {

    private static final long serialVersionUID = 2323962994727909366L;

    public EmailNotificationException() {
    }

    public EmailNotificationException(String message) {
        super(message);
    }

    public EmailNotificationException(Throwable cause) {
        super(cause);
    }

    public EmailNotificationException(String message, Throwable cause) {
        super(message, cause);
    }

    @Override
    public Object getObjectError() {
        return new ErrorData();
    }

    class ErrorData {
        private String message = "Email already Exist Data";
        private ErrorType errorType = ErrorType.ALREADY_EXIST;
    }

}
