package br.org.otus.user.service;

import java.util.List;

import br.org.otus.user.dto.ManagementUserDto;

public interface ManagementUserService {
    List<ManagementUserDto> fetchUsers();

    void disableUsers(ManagementUserDto managementUserDto);

    void enableUsers(ManagementUserDto managementUserDto);
}
