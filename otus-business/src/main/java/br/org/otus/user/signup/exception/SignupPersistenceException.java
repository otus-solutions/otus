package br.org.otus.user.signup.exception;

public class SignupPersistenceException extends SignupException {

    private static final long serialVersionUID = 725155479495692525L;

    public SignupPersistenceException() {
    }

    public SignupPersistenceException(String message) {
        super(message);
    }

    public SignupPersistenceException(Throwable cause) {
        super(cause);
    }

    public SignupPersistenceException(String message, Throwable cause) {
        super(message, cause);
    }

    public SignupPersistenceException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    @Override
    public Object getObjectError() {
        return new ErrorData();
    }

    class ErrorData {
        public static final String message = "Error while persisting data.";
        public ErrorType errorType = ErrorType.PERSISTENCE_ERROR;
    }

}
