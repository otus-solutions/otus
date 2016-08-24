package br.org.otus.email;

import br.org.otus.email.system.OtusSystemInstallationEmailTest;
import br.org.otus.email.user.signup.OtusNewUserGreetingsEmailTest;
import br.org.otus.email.user.signup.OtusNewUserNotificationEmailTest;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({ 
    OtusNewUserNotificationEmailTest.class,
    OtusNewUserGreetingsEmailTest.class,
    OtusSystemInstallationEmailTest.class
})
public class OtusEmailFactorySuite {

}
