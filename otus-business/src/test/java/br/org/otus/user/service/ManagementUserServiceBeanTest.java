package br.org.otus.user.service;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.email.user.management.DisableUserNotificationEmail;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.user.User;
import br.org.otus.user.UserDao;
import br.org.otus.user.dto.ManagementUserDto;

@RunWith(PowerMockRunner.class)
public class ManagementUserServiceBeanTest {

	@InjectMocks
	private ManagementUserServiceBean managementUserServiceBean;

	@Mock
	private UserDao userDao;

	@Mock
	private ManagementUserDto managementUserDto;

	@Mock
	private EmailNotifierService emailNotifierService;

	@Mock
	private User user;

	@Mock
	private DisableUserNotificationEmail disableUserNotificationEmail;

	@Mock
	private List<User> users;

	@Before
	public void setup() throws Exception {

		users.add(user);

		PowerMockito.when(userDao.fetchByEmail(managementUserDto.getEmail())).thenReturn(user);
	}

	@Test
	public void fetchUsers_method_should_called_fetchAll_returning_a_list() {
		managementUserServiceBean.fetchUsers();
		List<ManagementUserDto> administrationUsersDtos = mock(ArrayList.class);

		verify(userDao).fetchAll();
		PowerMockito.when(managementUserServiceBean.fetchUsers()).thenReturn(administrationUsersDtos);
	}

	@Test
	public void disableUsers_method_should_called_methods_fetchByEmail_disable_and_update()
			throws DataNotFoundException {
		managementUserServiceBean.disableUsers(managementUserDto);

		verify(userDao).fetchByEmail(managementUserDto.getEmail());
		verify(user).disable();
		verify(userDao).update(user);
	}

	@Test
	public void enableUsers_method_should_called_methods_fetchByEmail_enable_update() throws DataNotFoundException {
		managementUserServiceBean.enableUsers(managementUserDto);

		verify(userDao).fetchByEmail(managementUserDto.getEmail());
		verify(user).enable();
		verify(userDao).update(user);
	}

}
