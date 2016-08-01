package br.org.otus.user.signup.exception;

import br.org.otus.exceptions.ResponseError;

public class SignupException extends Exception implements ResponseError {

    private static final long serialVersionUID = 9062774901048927407L;
    
    private ResponseError responseError;

    public SignupException() {
    }

    public SignupException(String message) {
        super(message);
    }

    public SignupException(Throwable cause) {
        super(cause);
        responseError = (ResponseError) cause;
    }

    public SignupException(String message, Throwable cause) {
        super(message, cause);
        responseError = (ResponseError) cause;
    }

    public SignupException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
        responseError = (ResponseError) cause;
    }

    @Override
    public Object getObjectError() {
        return responseError.getObjectError();
    }

}
