package br.org.otus.exceptions;

public class InvalidDtoException extends Exception implements ResponseError{
    @Override
    public Object getObjectError() {
        return new ErrorData();
    }

    class ErrorData{
        private String message = "Object Invalid";
        private ErrorType errorType = ErrorType.OBJECT_INVALID;
    }
}
