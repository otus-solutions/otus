package br.org.otus.user.signup.exception;

import br.org.otus.exceptions.ResponseError;

public class SignupValidationException extends SignupException {

    private static final long serialVersionUID = 3817165386353861835L;

    public SignupValidationException() {
    }

    public SignupValidationException(String message) {
        super(message);
    }

    public SignupValidationException(Throwable cause) {
        super(cause);
    }

    public SignupValidationException(String message, Throwable cause) {
        super(message, cause);
    }

    public SignupValidationException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    @Override
    public Object getObjectError() {
        if (getCause() instanceof ResponseError) {
            return ((ResponseError) getCause()).getObjectError();
        } else {
            return new ErrorData();            
        }
    }

    class ErrorData {
        public static final String message = "Signup data is not valid.";
        public ErrorType errorType = ErrorType.INVALID_DATA;
    }

}
