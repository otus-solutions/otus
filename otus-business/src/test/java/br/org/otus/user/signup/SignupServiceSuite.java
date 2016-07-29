package br.org.otus.user.signup;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({ 
    SignupServiceValidationsTest.class,
    SignupServiceEmailSendTest.class,
    SignupServiceDataPersistenceTest.class, 
    SignupServiceExecutionTest.class
})
public class SignupServiceSuite {

}
