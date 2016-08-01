package br.org.otus.exceptions;

public class AlreadyExistException extends Exception implements ResponseError {

    private static final long serialVersionUID = 3412089617768799192L;

    @Override
    public Object getObjectError() {
        return new ErrorData();
    }

    class ErrorData{
        private String message = "Already Exist Data";
        private ErrorType errorType = ErrorType.ALREADY_EXIST;
    }
}
