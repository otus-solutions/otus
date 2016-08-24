package br.org.otus.user.signup;

import br.org.otus.configuration.builder.SystemConfigBuilder;
import br.org.otus.configuration.dto.OtusInitializationConfigDto;
import br.org.otus.email.OtusEmailFactory;
import br.org.otus.email.dto.EmailSenderDto;
import br.org.otus.email.service.EmailNotifierService;
import br.org.otus.email.service.EmailNotifierServiceBean;
import br.org.otus.email.user.signup.NewUserGreetingsEmail;
import br.org.otus.email.user.signup.NewUserNotificationEmail;
import br.org.otus.exceptions.webservice.common.AlreadyExistException;
import br.org.otus.exceptions.webservice.http.EmailNotificationException;
import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.user.User;
import br.org.otus.user.UserDao;
import br.org.otus.user.dto.SignupDataDto;
import br.org.otus.user.management.ManagementUserService;
import br.org.owail.sender.email.Recipient;
import br.org.owail.sender.email.Sender;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
@PrepareForTest({SignupServiceBean.class, Recipient.class, OtusEmailFactory.class, SystemConfigBuilder.class})
public class SignupServiceTest {
    private static final String EMAIL = "email@email";
    private static final String NAME = "Teste";

    @InjectMocks
    private SignupServiceBean signupServiceBean;

    @Mock
    private UserDao userDao;

    @Mock
    private EmailNotifierServiceBean emailNotifierService;

    @Mock
    private ManagementUserService managementUserService;

    @Mock
    private SignupDataDto signupDataDto;

    @Mock
    private Recipient recipient;

    @Mock
    private User user;

    @Mock
    private NewUserGreetingsEmail newUserGreetingsEmail;

    @Mock
    private Sender sender;

    @Mock
    private NewUserNotificationEmail newUserNotificationEmail;

    @Mock
    private OtusInitializationConfigDto initializationConfigDto;

    @Mock
    private EmailSenderDto emailSender;

    @Test(expected = AlreadyExistException.class)
    public void method_create_should_verify_if_isUnique() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        Mockito.when(signupDataDto.getEmail()).thenReturn(EMAIL);
        signupServiceBean.create(signupDataDto);
        Mockito.verify(managementUserService.isUnique(signupDataDto.getEmail()));
    }

    @Test
    public void method_create_should_send_email() throws Exception {
        PowerMockito.mockStatic(Recipient.class);
        PowerMockito.mockStatic(OtusEmailFactory.class);
        PowerMockito.whenNew(User.class).withNoArguments().thenReturn(user);

        Mockito.when(emailNotifierService.getSender()).thenReturn(sender);
        Mockito.when(userDao.findAdmin()).thenReturn(user);
        Mockito.when(user.getEmail()).thenReturn(EMAIL);
        Mockito.when(user.getName()).thenReturn(NAME);
        Mockito.when(Recipient.createTO(NAME, EMAIL)).thenReturn(recipient);
        Mockito.when(OtusEmailFactory.createNewUserGreetingsEmail(sender, recipient)).thenReturn(newUserGreetingsEmail);
        Mockito.when(OtusEmailFactory.createNewUserNotificationEmail(sender, recipient, user)).thenReturn(newUserNotificationEmail);
        Mockito.when(managementUserService.isUnique(EMAIL)).thenReturn(Boolean.TRUE);
        Mockito.when(signupDataDto.getEmail()).thenReturn(EMAIL);

        signupServiceBean.create(signupDataDto);
        Mockito.verify(emailNotifierService).sendEmailSync(newUserGreetingsEmail);
        Mockito.verify(emailNotifierService).sendEmailSync(newUserNotificationEmail);
    }

    @Test(expected = AlreadyExistException.class)
    public void method_create_should_throw_AlreadyExistException_when_user_exist() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        Mockito.when(managementUserService.isUnique(EMAIL)).thenReturn(Boolean.FALSE);
        signupServiceBean.create(signupDataDto);
    }

    @Test(expected = AlreadyExistException.class)
    public void method_create_initializationConfig_should_verify_if_isUnique() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        Mockito.when(initializationConfigDto.getEmailSender()).thenReturn(emailSender);
        Mockito.when(emailSender.getEmail()).thenReturn(EMAIL);
        Mockito.when(managementUserService.isUnique(EMAIL)).thenReturn(Boolean.FALSE);
        signupServiceBean.create(initializationConfigDto);
        Mockito.verify(managementUserService.isUnique(initializationConfigDto.getUser().getEmail()));
    }

    @Test
    public void method_create_initializationConfig_should_send_email() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        PowerMockito.mockStatic(OtusEmailFactory.class);
        PowerMockito.mockStatic(SystemConfigBuilder.class);

        PowerMockito.when(SystemConfigBuilder.buildInitialUser(initializationConfigDto)).thenReturn(user);
        Mockito.when(managementUserService.isUnique(EMAIL)).thenReturn(Boolean.TRUE);
        Mockito.when(initializationConfigDto.getEmailSender()).thenReturn(emailSender);
        Mockito.when(emailSender.getEmail()).thenReturn(EMAIL);

        signupServiceBean.create(initializationConfigDto);
        Mockito.verify(emailNotifierService).sendSystemInstallationEmail(initializationConfigDto);
    }

    @Test(expected = AlreadyExistException.class)
    public void method_create_initializationConfig_should_throw_AlreadyExistException_when_user_exist() throws EmailNotificationException, EncryptedException, AlreadyExistException {
        Mockito.when(initializationConfigDto.getEmailSender()).thenReturn(emailSender);
        Mockito.when(emailSender.getEmail()).thenReturn(EMAIL);
        Mockito.when(managementUserService.isUnique(EMAIL)).thenReturn(Boolean.FALSE);
        signupServiceBean.create(initializationConfigDto);
    }
}
