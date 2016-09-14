package br.org.otus.configuration.builder;

import java.util.UUID;

public class TokenBuilder {

    public static String build(){
        return UUID.randomUUID().toString();
    }
}
