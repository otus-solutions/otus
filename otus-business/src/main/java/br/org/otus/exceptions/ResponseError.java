package br.org.otus.exceptions;

public interface ResponseError {

    Object getObjectError();

    enum ErrorType {
        ALREADY_EXIST, DATA_NOT_FOUND, OBJECT_INVALID;
    }
}
