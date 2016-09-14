package br.org.otus.user.management;

import br.org.otus.exceptions.webservice.common.DataNotFoundException;
import br.org.otus.exceptions.webservice.http.EmailNotificationException;
import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.exceptions.webservice.validation.ValidationException;
import br.org.otus.user.User;
import br.org.otus.user.dto.ManagementUserDto;

import java.util.List;

public interface ManagementUserService {
    List<ManagementUserDto> list();

    User fetchByEmail(String email);

    void enable(ManagementUserDto managementUserDto) throws EmailNotificationException, EncryptedException, ValidationException, DataNotFoundException;

    void disable(ManagementUserDto managementUserDto) throws EmailNotificationException, EncryptedException, ValidationException, DataNotFoundException;

    Boolean isUnique(String emailToVerify);
}
