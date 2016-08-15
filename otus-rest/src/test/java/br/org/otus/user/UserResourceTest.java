package br.org.otus.user;

import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.whenNew;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import br.org.otus.exceptions.ResponseError;
import br.org.otus.rest.Response;
import br.org.otus.user.dto.ManagementUserDto;
import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.service.ManagementUserService;
import br.org.otus.user.signup.SignupService;
import br.org.otus.user.signup.exception.SignupException;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ UserResource.class })
public class UserResourceTest {

	@InjectMocks
	private UserResource resource;

	@Mock
	private SignupService signupService;
	
	@Mock
	private SignupDataDto signupDataDto;
	
	@Mock
	private Response response;
	
	@Mock
	private ManagementUserService managementUserService;
	
	@Mock
	private ManagementUserDto managementUserDto;

	@Before
	public void setup() throws Exception {
		whenNew(Response.class).withNoArguments().thenReturn(response);
		PowerMockito.when(response.buildSuccess()).thenReturn(response);
		PowerMockito.when(response.buildSuccess(Mockito.any(ManagementUserDto.class))).thenReturn(response);
	}

	@Test
	public void signup_method_should_call_execute_from_SignupService() throws SignupException {
		resource.signup(signupDataDto);

		verify(signupService).execute(signupDataDto);
	}

	@Test
	public void signup_method_should_return_a_response_with_build_success_if_no_errors_occurs() throws SignupException {
		resource.signup(signupDataDto);

		verify(response).toJson();
	}

	@Test
	public void signup_method_should_return_a_response_with_build_error_if_errors_occurs() throws SignupException {
		doThrow(new SignupException()).when(signupService).execute(signupDataDto);

		resource.signup(signupDataDto);

		verify(response).buildError((ResponseError) Mockito.any(SignupException.class));
		verify(response).toJson();
	}

	@Test
	public void getUsers_method_should_called_method_fetchUsers() {
		resource.getUsers();

		verify(managementUserService).fetchUsers();
	}

	@Test
	public void disableUsers_method_should_called_method_disableUsers_with_parameter_managementUserDto() {
		resource.disableUsers(managementUserDto);

		verify(managementUserService).disableUsers(managementUserDto);
	}

	@Test
	public void enableUsers_method_should_called_method_enableUsers_with_parameter_managementUserDto() {
		resource.enableUsers(managementUserDto);

		verify(managementUserService).enableUsers(managementUserDto);
	}

}
