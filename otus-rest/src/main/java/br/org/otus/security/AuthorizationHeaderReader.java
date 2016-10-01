package br.org.otus.security;

import br.org.otus.response.builders.ResponseBuild;
import br.org.otus.response.exception.HttpResponseException;

public class AuthorizationHeaderReader {

    public static String readToken(String authorizationHeader){
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new HttpResponseException(ResponseBuild.Security.Validation.build());
        }

        return authorizationHeader.substring("Bearer".length()).trim();
    }
}
