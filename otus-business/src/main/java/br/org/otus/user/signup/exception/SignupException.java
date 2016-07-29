package br.org.otus.user.signup.exception;

public class SignupException extends Exception {

    private static final long serialVersionUID = 9062774901048927407L;

    public SignupException() {
    }

    public SignupException(String message) {
        super(message);
    }

    public SignupException(Throwable cause) {
        super(cause);
    }

    public SignupException(String message, Throwable cause) {
        super(message, cause);
    }

    public SignupException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
