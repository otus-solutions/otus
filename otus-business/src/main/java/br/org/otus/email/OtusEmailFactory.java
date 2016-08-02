package br.org.otus.email;

import br.org.otus.email.system.SystemInstallationEmail;
import br.org.otus.email.user.signup.NewUserGreetingsEmail;
import br.org.otus.email.user.signup.NewUserNotificationEmail;
import br.org.otus.user.User;
import br.org.owail.sender.email.Recipient;
import br.org.owail.sender.email.Sender;

public class OtusEmailFactory {

    public static SystemInstallationEmail createSystemInstallationEmail(Sender sender, Recipient recipient) {
        SystemInstallationEmail email = new SystemInstallationEmail(sender, recipient);
        email.setFrom(sender);

        return email;
    }

    public static NewUserGreetingsEmail createNewUserGreetingsEmail(Sender sender, Recipient recipient) {
        NewUserGreetingsEmail email = new NewUserGreetingsEmail(recipient);
        email.setFrom(sender);

        return email;
    }

    public static NewUserNotificationEmail createNewUserNotificationEmail(Sender sender, Recipient recipient, User user) {
        NewUserNotificationEmail email = new NewUserNotificationEmail(sender, recipient, user);
        email.setFrom(sender);

        return email;
    }

}
