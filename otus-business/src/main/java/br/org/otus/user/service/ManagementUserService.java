package br.org.otus.user.service;

import java.util.List;

import br.org.otus.exceptions.UserDisabledException;
import br.org.otus.exceptions.UserEnabledException;
import br.org.otus.user.dto.ManagementUserDto;

public interface ManagementUserService {
    List<ManagementUserDto> fetchUsers();

    void disableUsers(ManagementUserDto managementUserDto) throws UserDisabledException;

    void enableUsers(ManagementUserDto managementUserDto) throws UserEnabledException;
}
