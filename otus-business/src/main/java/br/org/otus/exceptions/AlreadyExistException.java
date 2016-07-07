package br.org.otus.exceptions;

public class AlreadyExistException extends Exception implements ResponseError {
    @Override
    public Object getObjectError() {
        return new ErrorData();
    }

    class ErrorData{
        private String message = "Already Exist Data";
        private ErrorType errorType = ErrorType.ALREADY_EXIST;
    }
}
