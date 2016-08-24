package br.org.otus.user;

import br.org.otus.user.api.UserFacade;
import br.org.otus.user.dto.ManagementUserDto;
import br.org.otus.user.dto.SignupDataDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ UserResource.class })
public class UserResourceTest {

	@InjectMocks
	private UserResource resource;

	@Mock
	private UserFacade userFacade;

	@Mock
	private SignupDataDto signupDataDto;

	@Mock
	private ManagementUserDto managementUserDto;


	@Test
	public void  method_signup_should_call_create_from_UserFacade(){
		resource.signup(signupDataDto);
		Mockito.verify(userFacade).create(signupDataDto);
	}

	@Test
	public void  method_list_should_call_list_from_UserFacade(){
		resource.list();
		Mockito.verify(userFacade).list();
	}

	@Test
	public void method_disable_should_call_disable_from_UserFacade(){
		resource.disableUsers(managementUserDto);
		Mockito.verify(userFacade).disable(managementUserDto);
	}

	@Test
	public void method_enable_should_call_enable_from_UserFacade(){
		resource.enableUsers(managementUserDto);
		Mockito.verify(userFacade).enable(managementUserDto);
	}
}
