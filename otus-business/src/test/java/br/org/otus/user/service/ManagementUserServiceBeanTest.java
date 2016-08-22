package br.org.otus.user.service;

import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.email.user.management.DisableUserNotificationEmail;
import br.org.otus.email.user.management.EnableUserNotificationEmail;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.exceptions.UserDisabledException;
import br.org.otus.exceptions.UserEnabledException;
import br.org.otus.user.User;
import br.org.otus.user.UserDao;
import br.org.otus.user.dto.ManagementUserDto;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

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
			throws DataNotFoundException, UserDisabledException {
		managementUserServiceBean.disableUsers(managementUserDto);

		verify(userDao).fetchByEmail(managementUserDto.getEmail());
		verify(user).disable();
		verify(userDao).update(user);
	}

	@Test
	public void enableUsers_method_should_called_methods_fetchByEmail_enable_update() throws DataNotFoundException, UserEnabledException {
		managementUserServiceBean.enableUsers(managementUserDto);

		verify(userDao).fetchByEmail(managementUserDto.getEmail());
		verify(user).enable();
		verify(userDao).update(user);
	}

	@Test(expected = UserDisabledException.class)
	public void disableUsers_method_should_throw_exception_when_user_is_admin() throws UserDisabledException {
		PowerMockito.when(user.isAdmin()).thenReturn(Boolean.TRUE);
		managementUserServiceBean.disableUsers(managementUserDto);
	}

	@Test(expected = UserDisabledException.class)
	public void disabledUsers_method_should_throw_UserException_when_notFound() throws UserDisabledException, DataNotFoundException {
		PowerMockito.when(userDao.fetchByEmail(managementUserDto.getEmail())).thenThrow(DataNotFoundException.class);
		managementUserServiceBean.disableUsers(managementUserDto);
	}

	@Test(expected = UserDisabledException.class)
	public void disabledUsers_method_should_throw_UserException_when_emailError() throws UserDisabledException, DataNotFoundException, EmailNotificationException {
		PowerMockito.doThrow(new EmailNotificationException()).when(emailNotifierService).sendEmail(Mockito.any(EnableUserNotificationEmail.class));
		managementUserServiceBean.disableUsers(managementUserDto);
	}

	@Test(expected = UserEnabledException.class)
	public void enableUsers_method_should_throw_UserException_when_notFound() throws DataNotFoundException, UserEnabledException {
		PowerMockito.when(userDao.fetchByEmail(managementUserDto.getEmail())).thenThrow(DataNotFoundException.class);
		managementUserServiceBean.enableUsers(managementUserDto);
	}

	@Test(expected = UserEnabledException.class)
	public void enableUsers_method_should_throw_UserException_when_emailError() throws DataNotFoundException, EmailNotificationException, UserEnabledException {
		PowerMockito.doThrow(new EmailNotificationException()).when(emailNotifierService).sendEmail(Mockito.any(EnableUserNotificationEmail.class));
		managementUserServiceBean.enableUsers(managementUserDto);
	}
}
