package br.org.otus.user.service;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.email.user.management.DisableUserNotificationEmail;
import br.org.otus.email.user.management.EnableUserNotificationEmail;
import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.exceptions.EmailNotificationException;
import br.org.otus.user.User;
import br.org.otus.user.UserDao;
import br.org.otus.user.dto.ManagementUserDto;
import br.org.tutty.Equalizer;

@Stateless
public class ManagementUserServiceBean implements ManagementUserService {

	@Inject
	private UserDao userDao;

	@Inject
	private EmailNotifierService emailNotifierService;

	@Override
	public List<ManagementUserDto> fetchUsers() {
		List<ManagementUserDto> administrationUsersDtos = new ArrayList<>();
		List<User> users = userDao.fetchAll();

		users.stream().forEach(user -> {
			ManagementUserDto managementUserDto = new ManagementUserDto();

			try {
				Equalizer.equalize(user, managementUserDto);
				administrationUsersDtos.add(managementUserDto);

			} catch (Exception e) {
				e.printStackTrace();
			}
		});

		return administrationUsersDtos;
	}

	@Override
	public void disableUsers(ManagementUserDto managementUserDto) {
		try {
			User user = userDao.fetchByEmail(managementUserDto.getEmail());
			user.disable();

			userDao.update(user);

			DisableUserNotificationEmail disableUserNotificationEmail = new DisableUserNotificationEmail();
			disableUserNotificationEmail.defineRecipient(user);
			disableUserNotificationEmail.setFrom(emailNotifierService.getSender());

			emailNotifierService.sendEmail(disableUserNotificationEmail);
		} catch (DataNotFoundException | EmailNotificationException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void enableUsers(ManagementUserDto managementUserDto) {
		try {
			User user = userDao.fetchByEmail(managementUserDto.getEmail());
			user.enable();

			userDao.update(user);

			EnableUserNotificationEmail enableUserNotificationEmail = new EnableUserNotificationEmail();
			enableUserNotificationEmail.defineRecipient(user);
			enableUserNotificationEmail.setFrom(emailNotifierService.getSender());

			emailNotifierService.sendEmail(enableUserNotificationEmail);
		} catch (DataNotFoundException | EmailNotificationException e) {
			e.printStackTrace();
		}
	}
}
