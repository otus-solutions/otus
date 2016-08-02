package br.org.otus.email;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import br.org.otus.email.system.OtusSystemInstallationEmailTest;
import br.org.otus.email.user.signup.OtusNewUserGreetingsEmailTest;
import br.org.otus.email.user.signup.OtusNewUserNotificationEmailTest;

@RunWith(Suite.class)
@Suite.SuiteClasses({ 
    OtusNewUserNotificationEmailTest.class,
    OtusNewUserGreetingsEmailTest.class,
    OtusSystemInstallationEmailTest.class
})
public class OtusEmailFactorySuite {

}
