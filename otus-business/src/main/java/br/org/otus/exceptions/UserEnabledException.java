package br.org.otus.exceptions;

public class UserEnabledException extends Exception implements ResponseError{
    @Override
    public Object getObjectError() {
        return new ErrorData();
    }

    class ErrorData{
        private String message = "User Enabled";
        private ErrorType errorType = ErrorType.USER_ENABLED;
    }
}
