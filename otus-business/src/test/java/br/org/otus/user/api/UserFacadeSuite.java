package br.org.otus.user.api;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
        UserFacadeAccessControlTest.class,
        UserFacadeCreateTest.class
})
public class UserFacadeSuite {
}
